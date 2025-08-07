import { ResourceOptions } from "adminjs";

export const couponResourceOptions: ResourceOptions = {
  navigation: {
    icon: 'Tag'
  },
  listProperties: ['id', 'code', 'type', 'value', 'isActive', 'expiresAt'],
  editProperties: ['code', 'type', 'value', 'isActive', 'expiresAt'],
  showProperties: ['id', 'code', 'type', 'value', 'isActive', 'expiresAt'],
  properties: {
    isActive: {
      props: {
        checked: true
      }
    },
    value: {
      props: {
        placeholder: 'Insira apenas números'
      }
    },
    type: {
      availableValues: [
        { value: 'percentage', label: 'Percentual' },
        { value: 'fixed', label: 'Fixo' },
      ],
    }
  },
  actions: {
    new: {
      layout: [
        ['@Header', { children: 'Insira abaixo os dados do cupom' }],
         [
          { flexDirection: 'row', flex: true, flexWrap: 'wrap', marginTop: '3rem' },
          [
            ['code', { flexGrow: 1, mx: '5px' }],
            ['type', { flexGrow: 1, mx: '5px' }],
            ['value', { flexGrow: 1, mx: '5px' }],
            ['expiresAt', { flexGrow: 1, mx: '5px' }]
          ]
        ],
        [[['isActive', { mx: '5px' }]]]
      ]
    },
    edit: {
      layout: [
        ['@Header', { children: 'Edite abaixo os dados do cupom' }],
         [
          { flexDirection: 'row', flex: true, flexWrap: 'wrap', marginTop: '3rem' },
          [
            ['code', { flexGrow: 1, mx: '5px' }],
            ['type', { flexGrow: 1, mx: '5px' }],
            ['value', { flexGrow: 1, mx: '5px' }],
            ['expiresAt', { flexGrow: 1, mx: '5px' }]
          ]
        ],
        [[['isActive', { mx: '5px' }]]]
      ]
    }
  }
}