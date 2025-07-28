import { ResourceWithOptions } from "adminjs";
import { categoryResourceOptions } from "./category";
import { getPrismaClient } from "../../database/prisma";
import { getModelByName } from "@adminjs/prisma"
import { productResourceFeatures, productResourceOptions } from "./product";

const prisma = getPrismaClient()

export const adminJsResources: ResourceWithOptions[] = [
  {
    resource: {
      model: getModelByName('Category'),
      client: prisma
    },
    options: categoryResourceOptions
  },
  {
    resource: {
      model: getModelByName('Product'),
      client: prisma
    },
    options: productResourceOptions,
    features: productResourceFeatures
  }
]