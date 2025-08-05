import { Response } from "express"
import { AuthenticatedRequest } from "../middlewares/auth"
import { userService } from "../services/userService"

export const usersController = {
  // Method GET /users/current
  show: async (req: AuthenticatedRequest, res: Response) => {
    try {
      const currentUser = req.user!
      return res.json(currentUser)
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message })
      }
    }
  },

    // Method PUT /users/current
  update: async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Não autenticado.' })
    }
    const { id } = req.user
    const { name, lastName, cpf, email, phone } = req.body

    try {
      const updatedUser = await userService.update(id, {
        name,
        lastName,
        cpf,
        email,
        phone
      })

      return res.json(updatedUser)
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message })
      }
    }
  },

  // Method PUT /users/current/password
  updatePassword: async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Não autenticado.' })
    }
    const user = req.user
    const { currentPassword, newPassword } = req.body

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "É necessário enviar senha atual e nova senha." })
    }

    try {
      const validUser = await userService.verifyPassword(user.email, currentPassword)
      if (!validUser) {
        return res.status(400).json({ message: "Senha incorreta!" })
      }

      await userService.updatePassword(user.id, { password: newPassword })

      return res.status(204).send()
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Erro interno"
      return res.status(500).json({ message: msg })
    }
  }
}