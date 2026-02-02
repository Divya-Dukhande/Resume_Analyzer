import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { loginUser } from "../../services/api";
import "./Login.css";

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        try {
            setLoading(true);

            if (!email || !password) {
                toast.error("Please fill all fields");
                return;
            }

            const res = await loginUser({ email, password });

            localStorage.setItem("authToken", res.data.token);
            localStorage.setItem("isLoggedIn", "true");

            toast.success("Login successful");
            navigate("/dashboard");
        } catch (err) {
            toast.error(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-bg">
            <div className="auth-overlay">
                <div className="auth-card">
                    <h2 className="auth-title">Login</h2>

                    <input
                        className="auth-input"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        className="auth-input"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        className="auth-button"
                        onClick={handleLogin}
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                    <p className="auth-link">
                        New user?
                        <span onClick={() => navigate("/register")}> Register</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
