import express from "express";
import cors from "cors";
import { connectDatabase } from "./config/db.js";
import todoRouter from "./routes/todoRoute.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());



app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,
}));
app.use(express.json());


app.use("/api/todos", todoRouter);
connectDatabase()
  .then(() => {
    console.log(" Database connected successfully");
  })
  .catch((err) => {
    console.error(" Database connection failed:", err);
    process.exit(1);
  });





app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
