import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

import mealsRouter from "./routes/meals";
import logsRouter from "./routes/logs";

// Recreate __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middleware
app.use(express.json());

// Serve static files (e.g. NFC page)
app.use(express.static(path.join(__dirname, "../public")));

// Routes
app.use("/api/meals", mealsRouter);
app.use("/api/logs", logsRouter);

// Default route
app.get("/", (_req, res) => {
    res.send("Meal Tracker API is running");
});

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));