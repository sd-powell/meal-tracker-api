import express from "express";

const app = express();

app.get("/", (_req, res) => {
    res.send("Server is working");
});

app.listen(3000, () => console.log("Test server running on port 3000"));