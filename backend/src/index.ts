import { Hono } from 'hono'
import app from './routes'
const router = new Hono()

router.route('/api/v1', app);

router.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default router
