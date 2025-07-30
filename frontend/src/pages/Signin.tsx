import { Quote } from "../components/Quote"
import { Auth } from "../components/Auth"
export const Signin = () => {
    return <div>
        <div className="h-screen grid grid-cols-1 lg:grid-cols-2">
            <div className="flex justify-center items-center">
                <Auth type="signin"/>
            </div>
            <div className="hidden lg:block">
                <Quote/>
            </div>
        </div>
    </div>
}