import express from 'express'
import { categoriesController } from './controller/categoriesController'

const router = express.Router()


// Rotas API - Categorias
router.get('/categories', categoriesController.index)
router.get('/categories/:id', categoriesController.show)


export { router }