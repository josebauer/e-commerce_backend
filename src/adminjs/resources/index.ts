import { ResourceWithOptions } from "adminjs";
import { categoryResourceOptions } from "./category";
import { getPrismaClient } from "../../database/prisma";
import { getModelByName } from "@adminjs/prisma"
import { productResourceFeatures, productResourceOptions } from "./product";
import { couponResourceOptions } from "./coupon";
import { userResourceOptions } from "./user";

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
  },
  {
    resource: {
      model: getModelByName('Coupon'),
      client: prisma
    },
    options: couponResourceOptions
  },
  {
    resource: {
      model: getModelByName('User'),
      client: prisma
    },
    options: userResourceOptions
  }
]