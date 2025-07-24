import { getPrismaClient } from "../database/prisma"

const prisma = getPrismaClient()

export const createCategory = async (data: {
  name: string
}) => {
  return prisma.category.create({ data })
}