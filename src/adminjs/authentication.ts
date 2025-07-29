import { AuthenticationOptions } from "@adminjs/express";
import bcrypt from "bcrypt";
import { ADMINJS_COOKIE_PASS } from "../config/enviroment";
import { getPrismaClient } from "../database/prisma";

const prisma = getPrismaClient()

export const authenticationOptions: AuthenticationOptions = {
  authenticate: async (email, password) => {
    const user = await prisma.user.findUnique({ where: { email } })

    if (user && user.role === 'admin') {
      const matched = await bcrypt.compare(password, user.password)

      if (matched) {
        return user
      }
    }
    return false
  },
  cookiePassword: ADMINJS_COOKIE_PASS
}