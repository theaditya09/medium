import { Hono } from "hono";
import userRoute from "./user";
import blogRoute from "./blog";
import blogsRoute from "./blogs";

const app = new Hono();
app.route('/user', userRoute);
app.route('/blog', blogRoute);
app.route('/blogs', blogsRoute);

export default app;