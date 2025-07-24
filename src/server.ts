import 'dotenv/config'
import express from 'express'
import cors from "cors"
import { createAdminRouter } from './adminjs'
import { getPrismaClient } from './database/prisma'
import { router } from './routes'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())

app.use(express.static('public'))
app.use(express.json())

const { admin, adminRouter } = createAdminRouter()
app.use(admin.options.rootPath, adminRouter)

app.use(router)

app.listen(PORT, async () => {
  try {
    const prisma = getPrismaClient()
    await prisma.$connect()
    console.log("DB connection successful")
  } catch (err) {
    console.error("DB connection failed:", err)
  }

  console.log(`Server started successfully at port ${PORT}`)
})
