import { Hono } from "hono";
const userRoute = new Hono<{
    Bindings: {
        DATABASE_URL: string
    } 
}>();

import { PrismaClient } from "../generated/prisma";
import { withAccelerate } from '@prisma/extension-accelerate'

userRoute.post('/signup', async c => { 
        const prisma = new PrismaClient().$extends(withAccelerate())
        const body = await c.req.json();
        
        const res = await prisma.user.create({
            data : {
                email : body.email,
                password : body.password,
            },
        })
        return c.json(res);
})

userRoute.post('/signin', c => {
    return c.text('signin route');
})

export default userRoute