import { getPrismaClient } from "../database/prisma"

const prisma = getPrismaClient()

export const categoryService = {
  getAllCategories: async () => {
    return prisma.category.findMany({
      include: { products: true }
    })
  },

  getCategoryById: async (id: number) => {
    return prisma.category.findUnique({
      where: { id },
      include: { products: true }
    })
  }
}
