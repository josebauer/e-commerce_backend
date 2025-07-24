import { Request, Response } from "express";
import { categoryService } from "../services/categoryService";


export const categoriesController = {
  // Method GET /categories
  index: async (req: Request, res: Response) => {
    try {
      const categories = await categoryService.getAllCategories()

      return res.json(categories)
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message })
      }
    }
  },

  // Method GET /categories/:id
  show: async (req: Request, res: Response) => {
    const id = Number(req.params.id)

    try {
      const category = await categoryService.getCategoryById(id)
       if (!category) {
        return res.status(404).json({ error: "Categoria não encontrada" })
      }
      return res.json(category)
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message })
      }
    }
  }
}