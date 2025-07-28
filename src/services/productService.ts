import { getPrismaClient } from "../database/prisma";

const prisma = getPrismaClient()

export const productService = {
  getAllProducts: async () => {
    return prisma.product.findMany()
  },

  getProductById: async (id: number) => {
    return prisma.product.findUnique({
      where: { id }
    })
  }
}