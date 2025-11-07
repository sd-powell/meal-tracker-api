import express from "express";
import mealsRouter from "./routes/meals";
import logsRouter from "./routes/logs";

const app = express();
app.use(express.json());

// Routes
app.use("/api/meals", mealsRouter);
app.use("/api/logs", logsRouter);

// Default route
app.get("/", (req, res) => {
    res.send("Meal Tracker API is running");
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));