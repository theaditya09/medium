import { Link } from "react-router-dom"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { type SignupInput } from "@swekandrew/medium-common"
import { useState } from "react"

export const Auth = ({type} : {type:"signup" | "signin"}) => {

    const [signupInputs, setSignupInputs] = useState<SignupInput>({
        email : "",
        password : "",
        name : ""
    })

    return <div className="flex items-center justify-center">
    <div>
        <Heading label={type==="signin"?"Log into account" : "Create an account"}/>
        <div className="text-md text-center text-slate-500 mb-8">{type === "signup" ? "Already have an account? " : "Don't have an account? "}<Link className="underline" to={type==="signup" ? '/signin' : '/signup'}>{type==="signup" ? "Login" : "Sign Up"}</Link></div>
        {type==="signup" ? <InputBox type="text" onChange={ (e) => {
            setSignupInputs({
                ...signupInputs,
                name : e.target.value
            })
        }} label="Name" placeholder="John Doe"/> : null}
        <InputBox type="text" onChange={ (e) => {
            setSignupInputs({
                ...signupInputs,
                email : e.target.value
            })
        }} label="Email" placeholder="johndoe@email.com"/>
        <InputBox type="password" onChange={ (e) => {
            setSignupInputs({
                ...signupInputs,
                password : e.target.value
            })
        }} label="Password" placeholder="********"/>
        <Button onClick={() => {}} label={type === "signup" ? "Sign Up" : "Sign In"}/>
    </div>
    </div>
}