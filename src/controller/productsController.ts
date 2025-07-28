import { Request, Response } from "express";
import { productService } from "../services/productService";


export const productsController = {
  // Method GET /products
  index: async (req: Request, res: Response) => {
    try {
      const products = await productService.getAllProducts()

      return res.json(products)
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message })
      }
    }
  },

  // Method GET /products/:id
  show: async (req: Request, res: Response) => {
    const id = Number(req.params.id)

    try {
      const product = await productService.getProductById(id)
       if (!product) {
        return res.status(404).json({ error: "Produto não encontrado" })
      }
      return res.json(product)
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message })
      }
    }
  }
}