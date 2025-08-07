import { ResourceOptions } from "adminjs";
import bcrypt from 'bcrypt'

export const userResourceOptions: ResourceOptions = {
  navigation: {
    icon: 'Users'
  },
  listProperties: ['id', 'name', 'cpf', 'email', 'role'],
  editProperties: ['name', 'lastName', 'cpf', 'email', 'password', 'phone', 'role'],
  showProperties: ['id', 'name', 'lastName', 'cpf', 'email', 'phone', 'role', 'createdAt'],

  properties: {
    password: {
      type: 'password'
    }, 
    role: {
      availableValues: [
        { value: 'customer', label: 'Cliente' },
        { value: 'admin', label: 'Administrador' },
      ],
    },
  },

  actions: {
    new: {
      before: async (request) => {
        if (request.payload?.password) {
          request.payload.password = await bcrypt.hash(request.payload.password, 10)
        }
        return request
      },
      layout: [
        ['@Header', { children: 'Insira abaixo os dados do usuário' }],
         [
          { flexDirection: 'row', flex: true, flexWrap: 'wrap', marginTop: '3rem' },
          [
            ['name', { flexGrow: 1, mx: '5px' }],
            ['lastName', { flexGrow: 1, mx: '5px' }],
            ['cpf', { flexGrow: 1, mx: '5px' }],
            ['email', { flexGrow: 1, mx: '5px' }]
          ]
        ],
        [
          { flexDirection: 'row', flex: true, flexWrap: 'wrap', marginTop: '3rem' },
          [
            ['password', { flexGrow: 1, mx: '5px' }],
            ['phone', { flexGrow: 1, mx: '5px' }],
            ['role', { flexGrow: 1, mx: '5px' }],
          ]
        ]
      ]
    },
    edit: {
      before: async (request) => {
        if (request.payload?.password) {
          request.payload.password = await bcrypt.hash(request.payload.password, 10)
        } else {
          delete request.payload?.password
        }
        return request
      }
    },
  }
}