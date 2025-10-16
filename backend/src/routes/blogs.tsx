import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const blogsRoute = new Hono<{
    Bindings: {
        DATABASE_URL: string,
    }
}>();

blogsRoute.get('/', async c => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try{
        const blogs = await prisma.post.findMany({
            select : {
                content : true,
                title : true,
                id : true,
                author : {
                    select : {
                        name : true
                    }
                }
            }
        });
    
        return c.json({
            blogs
        });
    }catch(err){
        return c.text('DB call failed, retry. Error : ' + err);
    }
})


export default blogsRoute

