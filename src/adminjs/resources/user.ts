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
  },

  actions: {
    new: {
      before: async (request) => {
        if (request.payload?.password) {
          request.payload.password = await bcrypt.hash(request.payload.password, 10)
        }
        return request
      }
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
    }
  }
}