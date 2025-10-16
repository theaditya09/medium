export const AppBar = () => {
    return(
        <div className="flex justify-between border-b border-gray-200 px-10">
            <div className="m-1 flex gap-7 items-center">
                <div className="font-semibold text-lg font-serif">Medium</div>
                {/* <div>Drafts in Kiraga</div> */}
                {/* <div>Saved</div> */}
            </div>
            <div className="m-3 flex gap-5 p-2 items-center">
                <button className="bg-green-500 text-white pl-3 pr-3 pt-1 pb-1 rounded-4xl cursor-pointer">Publish</button>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>


                <div className="bg-gray-300 w-8 h-8 rounded-full flex justify-center items-center">
                        <div className="text-sm font-normal">{"A"}</div>
                    </div>
            </div>
        </div>
    )
}

