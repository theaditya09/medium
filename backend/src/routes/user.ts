import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { signupInput, signinInput } from "@swekandrew/medium-common"

const userRoute = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    } 
}>();

userRoute.post('/signup', async c => { 
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())

        const body = await c.req.json();
        const { success } = signupInput.safeParse(body);
        if(!success){
            return c.json({
                message : "Inputs are not correct"
            })
        }
        
        try{
            const user = await prisma.user.create({
                data : {
                    email : body.email,
                    password : body.password,
                    name : body.name
                },
            })

            const token = await sign({
                id : user.id,
                email : user.email
            }, c.env.JWT_SECRET)

            return c.json({token});
        } catch(err){
            return c.text('An error encountered while signup ' + err);
        }
})

userRoute.post('/signin', async c => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();  
    const { success } = signinInput.safeParse(body);
    if(!success){
        return c.json({
            message : "Inputs are not correct"
        })
    }

    try{
        const user = await prisma.user.findUnique({
            where : {
                email : body.email
            }
        })

        if(!user || user.password!=body.password){
            c.status(403);
            return c.json({
                error : "Invalid credentials / User doesnt exist"
            })
        }

        const token = await sign({
                id : user.id,
                email : user.email
            }, c.env.JWT_SECRET)
        return c.json({token});

    } catch(err){
        return c.text('An error encountered while signin ' + err);
    }
})

export default userRoute