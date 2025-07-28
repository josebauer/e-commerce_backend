import { ResourceOptions } from "adminjs";

export const categoryResourceOptions: ResourceOptions = {
  navigation: {
    icon: 'Archive'
  },
  listProperties: ['id', 'name'],
  editProperties: ['name'],
  showProperties: ['id', 'name']
}