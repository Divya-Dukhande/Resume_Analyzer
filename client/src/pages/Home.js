import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600">
            <div className="bg-white p-10 rounded-lg shadow-lg w-[420px] text-center">

                <h1 className="text-3xl font-bold mb-4 text-gray-800">
                    AI Resume Analyzer
                </h1>

                <p className="text-gray-600 mb-6">
                    Upload your resume and get AI-powered feedback,
                    score, strengths, weaknesses, and improvement suggestions.
                </p>

                <div className="space-y-3">
                    <Link
                        to="/login"
                        className="block bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                        Login
                    </Link>

                    <Link
                        to="/register"
                        className="block border border-blue-600 text-blue-600 py-2 rounded hover:bg-blue-50 transition"
                    >
                        Register
                    </Link>
                </div>

            </div>
        </div>
    );
}

export default Home;
