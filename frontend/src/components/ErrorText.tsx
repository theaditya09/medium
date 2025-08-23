export const ErrorText = ({err} : {err : String}) => {
    return <div className="flex justify-center text-sm text-red-500 font-normal">
        {err}
    </div>
}