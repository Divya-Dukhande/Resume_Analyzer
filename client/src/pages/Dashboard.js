import { useEffect, useState } from "react";
import api from "../utils/api";

function Dashboard() {
    const [data, setData] = useState([]);

    useEffect(() => {
        api.get("/dashboard").then(res => setData(res.data));
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
            {data.map(item => (
                <div key={item.id} className="bg-white p-4 mb-3 rounded shadow">
                    <p>Score: {item.score}</p>
                    <p className="text-sm">{item.analysis}</p>
                </div>
            ))}
        </div>
    );
}

export default Dashboard;
