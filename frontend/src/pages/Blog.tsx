import { useEffect } from "react";
import { useBlog } from "../hooks"
import { useParams } from "react-router-dom";
import { ProgressBar } from "../components/ProgressBar";

export const Blog = () => {

    const {id} = useParams<{id : string}>();    
    const {loading, blog} = useBlog({id: id ?? ""});

    if(loading){
        return <div>
                <ProgressBar/>
            </div>
    }

    return <>
        <div>hi from blog</div>
    </>
}