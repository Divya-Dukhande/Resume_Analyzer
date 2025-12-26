import { useState } from "react";
import api from "../utils/api";

function Upload() {
    const [result, setResult] = useState(null);

    function uploadResume(e) {
        const formData = new FormData();
        formData.append("resume", e.target.files[0]);

        api.post("/resume/upload", formData).then(res => {
            setResult(res.data);
        });
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded shadow w-96 text-center">
                <h2 className="text-xl font-bold mb-4">Upload Resume</h2>
                <input type="file" onChange={uploadResume} />
                {result && <p className="mt-4 font-semibold">Score: {result.score}</p>}
            </div>
        </div>
    );
}

export default Upload;
