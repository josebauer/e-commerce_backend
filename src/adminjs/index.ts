import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import { Database, Resource } from '@adminjs/prisma'
import { adminJsResources } from './resources'
import { componentLoader } from './components/index';

AdminJS.registerAdapter({ Database, Resource })

export const createAdminRouter = () => {
  const admin = new AdminJS({
    componentLoader,
    rootPath: '/admin',
    resources: adminJsResources,
    branding: {
      companyName: 'Racing Store',
      logo: 'racing-store-transparent.png',
      favicon: 'RS-logo.png',
      theme: {
        colors: {
          primary100: '#D71A25',
          primary80: '#D71A25',
          primary60: '#D71A25',
          primary40: '#D71A25',
          primary20: '#D71A25',
          grey100: '#151515',
          grey80: '#333333',
          grey60: '#4d4d4d',
          grey40: '#666666',
          grey20: '#dddddd',
          filterBg: '#ffffff',
          accent: '#961818ff',
          hoverBg: '#151515',
        }
      }
    }
  })

  admin.watch()

  const adminRouter = AdminJSExpress.buildRouter(admin)
  return { admin, adminRouter }
}