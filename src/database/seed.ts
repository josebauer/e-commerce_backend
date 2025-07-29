import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const email = 'admin@email.com'

  const existingAdmin = await prisma.user.findUnique({
    where: { email }
  })

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('admin123', 10)

    await prisma.user.create({
      data: {
        name: 'Admin',
        lastName: 'User',
        cpf: '00000000000',
        email,
        password: hashedPassword,
        phone: '11999999999',
        role: 'admin',
      }
    })

    console.log('Usuário admin cadastrado com sucesso!')
  } else {
    console.log('Usuário admin já está cadastrado.')
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())