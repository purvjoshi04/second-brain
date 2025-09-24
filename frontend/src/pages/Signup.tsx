import { useRef } from "react"
import { Button } from "../components/Button"
import { InputBox } from "../components/InputBox"
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Signup = () => {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const signup = async () => {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        if (!username || !password) {
            alert("Please fill in both username and password");
            return;
        }

        const backendUrl = BACKEND_URL
        if (!backendUrl) {
            alert("Backend URL is not configured");
            return;
        }

        try {
            await axios.post(`${backendUrl}/api/v1/signup`, {
                username,
                password
            });
            alert("You have signed up!");
        } catch (error) {
            console.error("Signup failed:", error);
            alert("Signup failed. Please try again.");
        }
    }

    return (
        <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
            <div className="bg-white rounded-xl border min-w-48 p-8 space-y-6 w-90">
                <InputBox ref={usernameRef} placeholder="Username" />
                <InputBox ref={passwordRef} placeholder="Password" />
                <div className="flex justify-center pt-4">
                    <Button variant={"primary"} text={"Signup"} fullWidth={true} loading={false} onClick={signup} />
                </div>
            </div>
        </div>
    )
}