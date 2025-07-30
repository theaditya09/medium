import type { ChangeEvent } from "react";

interface InputBoxType{
    label : string;
    placeholder : string;
    type : string
    onChange : (e : ChangeEvent<HTMLInputElement>) => void
}

export const InputBox = ({label, placeholder, type, onChange} : InputBoxType) => {
    return <div>
        <div className="font-medium mb-1 ml-1">{label}</div>
        <input onChange={onChange} type={type} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-4" placeholder={placeholder} required />
    </div>
}