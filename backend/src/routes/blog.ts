import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from "hono/jwt";
const blogRoute = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    } ,
    Variables : {
        userId : string
    }
}>();

blogRoute.use('/*', async (c, next) => {
    const header = c.req.header("Authorization") || "";
    if(!header.startsWith("Bearer ")){
        return c.json({
            msg : "Invalid Auth Header"
        })
    }

    try{
        const token = header.split(" ")[1];
        const payload = await verify(token, c.env.JWT_SECRET);
        c.set('userId', payload.id as string);
    } catch(err){
        return c.json({
            msg : "User not authorized"
        })
    }
    await next();
})

blogRoute.post('/test', async c => {
    return c.json({
        msg : "blog signin",
        id : c.get('userId')
    })
    
})

blogRoute.post('/', async c => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const userId = c.get('userId');
    const blog = await prisma.post.create({
        data : {
            title : body.title,
            content : body.content,
            authorId : userId
        }
    })
    return c.json({
        msg : "Post created succesfully",
        post : blog
    })
})

blogRoute.put('/',async  c => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const post = await prisma.post.update({
        where : {
            id : body.id
        },
        data : {
            title : body.title,
            content : body.content,
        }
    })

    return c.json({
        msg : "Blog updated successfully",
        post
    });
})

blogRoute.get('/', async c => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const id = body.id
    const post = await prisma.post.findFirst({
        where : {
            id
        }
    })
    
    if(!post){
        return c.json({
            msg: "Invalid post id, please enter a correct id"
        })
    }

    return c.json({
        msg : "Post fetched successfully",
        post
    })

})

blogRoute.get('/bulk', async c => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blogs = await prisma.post.findMany();

    return c.json({
        blogs
    });
})

export default blogRoute