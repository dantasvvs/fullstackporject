import cors from "cors";
import express from "express";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API do projeto fullstack funcionando." });
});

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

app.use(errorHandler);

export default app;

