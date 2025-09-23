import { Routes, Route } from "react-router-dom"
import { Signup } from "../pages/Signup"
import { Signin } from "../pages/Signin"
import { Dashboard } from "../pages/Dashboard"

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/signup" element={<Signup />}/>
            <Route path="/signin" element={<Signin />}/>
            <Route path="/dashboard" element={<Dashboard />}/>
        </Routes>
    )
}