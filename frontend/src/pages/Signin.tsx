import { Button } from "../components/Button"
import { InputBox } from "../components/InputBox"

export const Signin = () => {
    return (
        <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
            <div className="bg-white rounded-xl border min-w-48 p-8">
                <InputBox placeholder="Username" />
                <InputBox placeholder="Password" />
                <div className="flex justify-center pt-4">
                    <Button variant={"primary"} text={"Signup"} fullWidth={true} loading={true} />
                </div>
            </div>
        </div>
    )
}