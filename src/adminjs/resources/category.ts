import { ResourceOptions } from "adminjs";

export const categoryResourceOptions: ResourceOptions = {
  navigation: {
    icon: 'Tag'
  },
  listProperties: ['id', 'name'],
  editProperties: ['name'],
  showProperties: ['id', 'name']
}