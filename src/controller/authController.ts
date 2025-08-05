import { Request, Response } from "express"
import { userService } from "../services/userService"
import { jwtService } from "../services/jwtService"

export const authController = {
  // Method POST /auth/register
  register: async (req: Request, res: Response) => {
    const { name, lastName, cpf, email, password, phone } = req.body

    try {
      const userAlreadyExists = await userService.findByEmail(email)

      if (userAlreadyExists) {
        throw new Error('Este email já está cadastrado!')
      }

      const user = await userService.create({
        name,
        lastName,
        cpf,
        email,
        password,
        phone,
        role: 'customer'
      })

      return res.status(201).json(user)

    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message })
      }
    }
  },

  // Method POST /auth/login
    login: async (req: Request, res: Response) => {
    const { email, password } = req.body

    try {
      const user = await userService.verifyPassword(email, password)
      if (!user) {
        return res.status(401).json({ message: "E-mail ou senha incorretos!" })
      }

      const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      }

      const token = jwtService.signToken(payload, "1d")

      return res.json({ authenticated: true, ...payload, token })
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Erro interno"
      return res.status(500).json({ message: msg })
    }
  },
}