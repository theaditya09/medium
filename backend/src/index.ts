import { Hono } from 'hono'
import { cors } from 'hono/cors'
import app from './routes'

const router = new Hono()

router.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT'],
}))

router.route('/api/v1', app)

router.get('/', (c) => {
  return c.text('Hello from our backend!')
})

export default router
