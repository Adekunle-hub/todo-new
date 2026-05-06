import express from "express";
import cors from "cors";
import { connectDatabase } from "./config/db.js";
import todoRouter from "./routes/todoRoute.js";

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "http://localhost:5173",
  "https://todo-new-alpha.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
   
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked: ${origin}`));
    },
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/todos", todoRouter);

connectDatabase()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1);
  });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});