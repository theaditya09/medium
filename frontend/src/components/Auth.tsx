import { Link, useNavigate} from "react-router-dom"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { type SignupInput } from "@swekandrew/medium-common"
import { useState } from "react"
import axios from "axios"
import { BACKEND_URL } from '../../config'
import { ErrorText } from "./ErrorText"

export const Auth = ({type} : {type:"signup" | "signin"}) => {
    
    const navigate = useNavigate();
    let error = false;

    const [signupInputs, setSignupInputs] = useState<SignupInput>({
        email : "",
        password : "",
        name : ""
    })

    type SignInInput = Pick<SignupInput, 'email' | 'password'>;
    const signInData: SignInInput = {
        email: signupInputs.email,
        password: signupInputs.password
    };

    async function sendRequest(){
        try{
            let jwt;
            if(type==='signup'){
                const res = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, signupInputs)
                jwt = res.data.token;
            }else if(type==='signin'){
                const res = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, signInData)
                jwt = res.data.token;
            }
            localStorage.setItem("token", jwt);

            navigate('/blog');
             
        } catch(err){
            console.log(err);
            error = true;
        }
    }

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
        <Button onClick={() => {
            sendRequest();
        }} label={type === "signup" ? "Sign Up" : "Sign In"}/>
        { error ? <ErrorText err={type==="signup" ? "Some error occured while signup" : "Some error occured while signin"}></ErrorText> : null }
    </div>
    </div>
}