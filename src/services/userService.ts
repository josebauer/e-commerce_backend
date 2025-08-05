import { getPrismaClient } from "../database/prisma"
import bcrypt from 'bcrypt'

const prisma = getPrismaClient()

export const userService = {
  findByEmail: async (email: string) => {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })
    return user
  },

  create: async (data: { name: string, lastName: string, cpf: string, email: string, password: string, phone: string, role: 'customer' | 'admin'}) => {
    const hashedPassword = await bcrypt.hash(data.password, 10)

    return prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      }
    })
  },
  
  findById: async (id: number) => {
    const user = await prisma.user.findUnique({ where:{ id }});
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    return user;
  },

  update: async (id: number, data: {
    name: string,
    lastName: string,
    cpf: string,
    email: string,
    phone: string
  }) => {
    const updatedData = { ...data }

    return prisma.user.update({
      where: { id },
      data: updatedData
    })
  },

  updatePassword: async (id: number, data: { password?: string, }) => {
    const updatedData = { ...data }

    if (data.password) {
      updatedData.password = await bcrypt.hash(data.password, 10)
    }

    return prisma.user.update({
      where: { id },
      data: updatedData
    })
  },

  verifyPassword: async (email: string, plainPassword: string) => {
    const user = await prisma.user.findUnique({
      where: { email },
    })
    if (!user) return null
    const isMatch = await bcrypt.compare(plainPassword, user.password)
    return isMatch ? user : null
  },

}