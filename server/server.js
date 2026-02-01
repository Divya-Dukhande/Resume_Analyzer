import express from "express";
import cors from "cors";
import analysisRoute from "./routes/analysis.route.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/analysis", analysisRoute);
app.use("/api/auth", authRoutes);



app.listen(5000, () => console.log("Server running on 5000"));
