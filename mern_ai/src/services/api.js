import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api",
});

export const saveAnalysis = (data) =>
    API.post("/analysis", data);

export const getHistory = () =>
    API.get("/analysis");

export const loginUser = (data) =>
    API.post("/auth/login", data);

export const registerUser = (data) =>
    API.post("/auth/register", data);