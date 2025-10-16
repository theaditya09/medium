import { AppBar } from "../components/AppBar";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks";
import { ProgressBar } from "../components/ProgressBar";

type Blog = {
    id : string;
    author: { name: string };
    title: string;
    content: string;
    createdAt: string;
};

export const Blogs = () => {

    const {loading, blogs} = useBlogs() as { loading: boolean; blogs: Blog[] };

    if(loading){
        return <div>
                <ProgressBar/>
            </div>
    }

    // console.log(blogs)

  return (
    <div>
        <AppBar/>
        <div className="flex justify-center">
            <div className="max-w-3xl">
                {blogs.map(blog => (
                    <BlogCard  blogId={blog.id} authorName={blog.author.name} publisehdDate={blog.createdAt} title={blog.title} content={blog.content}/>
                ))}
            </div>
        </div>
    </div>
  );
};