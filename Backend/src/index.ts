import express from "express";
import adminRouter from "./admin.js"
import userRouter from "./user.js";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",  // frontend ka origin
  credentials: true
}));


// Routes
app.use("/admin", adminRouter);
app.use("/user", userRouter);

// Default route

app.get("/", (req, res) => res.send("OK"));


// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
