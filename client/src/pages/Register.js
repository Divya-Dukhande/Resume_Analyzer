import { useState } from "react";
import api from "../utils/api";
import { useNavigate, Link } from "react-router-dom";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function handleRegister() {
        if (!name || !email || !password) {
            alert("All fields are required");
            return;
        }

        api
            .post("/auth/register", {
                name,
                email,
                password,
            })
            .then(() => {
                alert("Registration successful");
                navigate("/login");
            })
            .catch(() => {
                alert("User already exists");
            });
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow w-96">

                <h2 className="text-2xl font-bold text-center mb-6">
                    Create Account
                </h2>

                <input
                    className="w-full border p-2 rounded mb-3"
                    placeholder="Full Name"
                    onChange={e => setName(e.target.value)}
                />

                <input
                    className="w-full border p-2 rounded mb-3"
                    placeholder="Email"
                    onChange={e => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    className="w-full border p-2 rounded mb-4"
                    placeholder="Password"
                    onChange={e => setPassword(e.target.value)}
                />

                <button
                    onClick={handleRegister}
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                >
                    Register
                </button>

                <p className="text-sm text-center mt-4">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600 hover:underline">
                        Login
                    </Link>
                </p>

            </div>
        </div>
    );
}

export default Register;
