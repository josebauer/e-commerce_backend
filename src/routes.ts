import express from 'express'
import { categoriesController } from './controller/categoriesController'
import { productsController } from './controller/productsController'

const router = express.Router()


// Rotas API - Categorias
router.get('/categories', categoriesController.index)
router.get('/categories/:id', categoriesController.show)

// Rotas API - Produtos
router.get('/products', productsController.index)
router.get('/products/:id', productsController.show)

export { router }