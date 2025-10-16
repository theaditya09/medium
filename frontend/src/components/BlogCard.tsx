import { Link } from "react-router-dom"

interface BlogCardInput{
    authorName : string,
    title : string,
    content : string,
    publisehdDate : string
    blogId : string
}

const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const BlogCard = ({
    authorName,
    title,
    content,
    publisehdDate,
    blogId
} : BlogCardInput) => {
    return(
        <Link to={`/blog/${blogId}`}>
        <div className="border-b border-gray-200 m-10">
            <div>
                <div className="flex gap-2 items-center ml-2">
                    <div className="bg-gray-300 w-8 h-8 rounded-full flex justify-center items-center">
                        <div className="text-sm font-normal">{authorName.toUpperCase()[0]}</div>
                    </div>
                    <div className="">{authorName}</div>
                    <div className="text-gray-500 text-sm">{formatDate(publisehdDate)}</div>
                </div>

                <div className="ml-3 mt-3">
                    <div className=" grid grid-cols-[80%_20%]">
                        <div>
                            <div className="mb-2 text-2xl font-bold">{title}</div>
                            <div className="mb-2 text-md font-light">
                                <div>{content.slice(0,200) + "..."}</div>
                            </div>
                        </div>
                        <div className="flex justify-center items-center">
                            <div className=" h-30 w-30 bg-red-500 flex justify-center items-center"> image </div>
                        </div>
                    </div> 
                </div>
                <div className=" ml-3 mb-3 text-gray-600 text-sm font-light">{Math.ceil(content.length / 100) + " min(s) read"}</div>
            </div>
        </div>
        </Link>
    )
}