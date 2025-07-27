import { Hono } from "hono";
const blogRoute = new Hono();

blogRoute.post('/', c => {
    return c.text('/api/v1/blog post route');
})

blogRoute.put('/', c => {
    return c.text('/api/v1/blog put route');
})

blogRoute.get('/:id', c => {
    const id = c.req.param('id');
    return c.text(`/api/v1/blog get ${id} route`);
})

blogRoute.get('/bulk', c => {
    return c.text('blog bulk route');
})

export default blogRoute