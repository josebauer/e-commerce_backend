import { ResourceWithOptions } from "adminjs";
import { categoryResourceOptions } from "./category";
import { getPrismaClient } from "../../database/prisma";
import { getModelByName } from "@adminjs/prisma"

const prisma = getPrismaClient()

export const adminJsResources: ResourceWithOptions[] = [
  {
    resource: {
      model: getModelByName('Category'),
      client: prisma
    },
    options: categoryResourceOptions
  }
]