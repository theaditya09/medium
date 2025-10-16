import { useState, useEffect} from "react"
import axios from "axios"
import { BACKEND_URL } from "../../config"

export const useBlog = ({id} : {id : string}) => {
    const [loading, setLoading] = useState(true)
    const [blog, setBlog] = useState()

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/id/${id}`)
            .then(res => {
                setBlog(res.data.post)
                setLoading(false)
            })
    }, [id])

    return{
        loading, 
        blog
    }
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true)
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blogs`)
            .then(res => {
                setBlogs(res.data.blogs)
                setLoading(false)
            })
    }, [])

    return{
        loading, 
        blogs
    }
}