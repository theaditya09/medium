import { Hono } from "hono";
const userRoute = new Hono<{
    Bindings: {
        DATABASE_URL: string
    } 
}>();

import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

userRoute.post('/signup', async c => { 
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())
        const body = await c.req.json();
        
        try{
            const res = await prisma.user.create({
                data : {
                    email : body.email,
                    password : body.password,
                },
            })
            return c.json(res);
        } catch(err){
            return c.text('An error encountered' + err);
        }
})

userRoute.post('/signin', c => {
    return c.text('signin route');
})

export default userRoute