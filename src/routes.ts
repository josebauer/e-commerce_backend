import express from 'express'
import { categoriesController } from './controller/categoriesController'
import { productsController } from './controller/productsController'
import { ensureAuth } from './middlewares/auth'
import { usersController } from './controller/usersController'
import { authController } from './controller/authController'

const router = express.Router()

// Rotas API - Autenticação
router.post('/auth/register', authController.register)
router.post('/auth/login', authController.login)

// Rotas API - Categorias
router.get('/categories', categoriesController.index)
router.get('/categories/:id', categoriesController.show)

// Rotas API - Produtos
router.get('/products', productsController.index)
router.get('/products/:id', productsController.show)

// Rotas API - Usuários
router.get('/users/current', ensureAuth, usersController.show)
router.put('/users/current', ensureAuth, usersController.update)
router.put('/users/current/password', ensureAuth, usersController.updatePassword)

export { router }