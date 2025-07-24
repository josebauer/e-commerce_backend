import 'dotenv/config'
import express from 'express'
import { createAdminRouter } from './adminjs'
import { getPrismaClient } from './database/prisma'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static('public'))
app.use(express.json())

const { admin, adminRouter } = createAdminRouter()
app.use(admin.options.rootPath, adminRouter)

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
