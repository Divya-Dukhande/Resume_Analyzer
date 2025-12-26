import { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function handleLogin() {
        api.post("/auth/login", { email, password }).then(res => {
            localStorage.setItem("token", res.data.token);
            navigate("/upload");
        });
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow w-96">
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
                <input className="w-full border p-2 mb-3" placeholder="Email" onChange={e => setEmail(e.target.value)} />
                <input className="w-full border p-2 mb-4" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                <button onClick={handleLogin} className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
            </div>
        </div>
    );
}

export default Login;
