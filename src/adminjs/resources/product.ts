import { BaseRecord, ResourceOptions, FeatureType, ActionRequest, ActionResponse, ActionContext, buildFeature, Edit } from "adminjs";
import uploadFileFeature from '@adminjs/upload';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { componentLoader, Components } from "../components/index";
import { getPrismaClient } from "../../database/prisma";

const prisma = getPrismaClient();
const __dirname = dirname(fileURLToPath(import.meta.url));

export const productResourceOptions: ResourceOptions = {
  navigation: {
    icon: 'Box'
  },
  listProperties: ['id', 'name', 'price', 'stock', 'isActive', 'category'],
  editProperties: ['name', 'description', 'brand', 'price', 'stock', 'isActive', 'uploadImages', 'category'],
  showProperties: ['id', 'name', 'brand', 'description', 'price', 'stock', 'isActive', 'productImages', 'category'],
  properties: {
    description: {
      type: 'textarea',
      props: {
        rows: 5,
      }
    },
    productImages: {
      isArray: true,
      components: {
        show: Components.ProductImagesShow,
      },
    },
    uploadImages: {
      components: {
        edit: Components.ProductImagesEdit
      }
    }
  },

   actions: {
    new: {
      after: async (response: ActionResponse, request: ActionRequest, context: ActionContext) => {
        const { record } = context;

        const recordId = record?.params?.id ?? record?.get('id');

        const imageKeys = Object.keys(record?.params || {}).filter(key =>
          key.startsWith("productImages.")
        );

        const urls = imageKeys.map(key => record?.params?.[key]);

        if (recordId && urls.length > 0) {
          await Promise.all(
            urls.map((url) =>
              prisma.productImage.create({
                data: {
                  productId: Number(recordId),
                  url,
                },
              })
            )
          );
        }

        return response;
      },
      layout: [
        ['@Header', { children: 'Insira abaixo os dados do produto' }],
         [
          { flexDirection: 'row', flex: true, flexWrap: 'wrap', marginTop: '3rem' },
          [
            ['name', { flexGrow: 1, mx: '5px' }],
            ['brand', { flexGrow: 1, mx: '5px' }],
            ['price', { flexGrow: 1, mx: '5px' }],
            ['stock', { flexGrow: 1, mx: '5px' }]
          ]
        ],
        [[['description', { mx: '5px' }]]],
        [
          [
            [[['uploadImages', { mx: '5px' }]]],
            [[['isActive', { mx: '5px' }]]],
            [[['category', { mx: '5px' }]]],
          ]
        ]
      ]
    },
     edit: {
      before: async (request, context) => {
        const { record } = context;

        if (record?.get('id')) {
          const recordId = Number(record.get('id'));

          const images = await prisma.productImage.findMany({
            where: { productId: recordId },
          });

          // Preenche corretamente o campo que o @adminjs/upload precisa
          return {
            ...request,
            record: {
              ...record?.toJSON(),
              params: {
                ...record?.params,
                productImages: images.map(img => img.url), // <- caminho relativo
              }
            }
          };
        }

        return request;
      },
      after: async (response: ActionResponse, request: ActionRequest, context: ActionContext) => {
        const { record } = context

        if (record?.get('id')) {
          const recordId = Number(record.get('id'))

          const existingImagesInDB = await prisma.productImage.findMany({
            where: { productId: recordId },
          })

          const existingUrls = existingImagesInDB.map(img => img.url)

          const updatedUrls = Object.keys(record.params || {})
            .filter(key => key.startsWith('productImages.') && !isNaN(Number(key.split('.')[1])))
            .map(key => record.params?.[key])
            .filter((url): url is string => typeof url === 'string')

          const newUrls = updatedUrls.filter(url => !existingUrls.includes(url))

          await Promise.all(
            newUrls.map(url =>
              prisma.productImage.create({
                data: {
                  productId: recordId,
                  url,
                },
              })
            )
          )

          const allUrls = [...existingUrls, ...newUrls]

          return {
            ...response,
            record: {
              ...record.toJSON(),
              params: {
                ...record.params,
                productImages: allUrls,
              },
            },
          }
        }

        return response
      },
      layout: [
         ['@Header', { children: 'Edite abaixo os dados do produto' }],
         [
          { flexDirection: 'row', flex: true, flexWrap: 'wrap', marginTop: '3rem' },
          [
            ['name', { flexGrow: 1, mx: '5px' }],
            ['brand', { flexGrow: 1, mx: '5px' }],
            ['price', { flexGrow: 1, mx: '5px' }],
            ['stock', { flexGrow: 1, mx: '5px' }]
          ]
        ],
        [[['description', { mx: '5px' }]]],
        [
          [
            [[['uploadImages', { mx: '5px' }]]],
            [[['isActive', { mx: '5px' }]]],
            [[['category', { mx: '5px' }]]],
          ]
        ]
      ]
    },
    show: {
      after: async (response: ActionResponse, request: ActionRequest, context: ActionContext) => {
        const { record } = context;

        if (record?.get('id')) {
          const recordId = Number(record.get('id'));

          const images = await prisma.productImage.findMany({
            where: { productId: recordId },
          });

          record.params.productImages = images.map((img) => img.url);

          return {
            ...response,
            record: record.toJSON()
          };
        }

        return response;
      }
    }
  }
};

export const productResourceFeatures: FeatureType[] = [
  uploadFileFeature({
    componentLoader,
    provider: {
      local: {
        bucket: path.join(__dirname, "..", "..", "..", "public"),
      },
    },
    properties: {
      file: "uploadImages",
      key: "productImages", 
      multiple: true,
    },
    uploadPath: (record: BaseRecord, filename: string) => {
      const id = record.get("id") || 'temp'
      return `images/products/${id}/${filename}`
    },    
    validation: {
      mimeTypes: ["image/jpeg", "image/png", "image/webp"],
    },
    multiple: true,

    propertiesParser: (request: ActionRequest) => {
      const field = "uploadImages"
      if (request?.payload?.[field]) {
        const raw = request.payload[field]

        const filtered = Array.isArray(raw)
          ? raw.filter((val) => typeof val !== "string")
          : typeof raw === "string" ? [] : [raw]

        request.payload[field] = filtered
      }

      return request
    }
  })
];