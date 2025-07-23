import express from "express"
import { createAdminRouter } from "./adminjs"
import prisma from "./database/prisma"

const app = express()

app.use(express.static('public'))
app.use(express.json())

const PORT = process.env.PORT || 3000

const { admin, adminRouter } = createAdminRouter()
app.use(admin.options.rootPath, adminRouter)

app.listen(PORT, async () => {
  try {
    await prisma.$connect()
    console.log("DB connection successful")
  } catch (err) {
    console.error("DB connection failed:", err)
  }

  console.log(`Server started successfully at port ${PORT}`)
})