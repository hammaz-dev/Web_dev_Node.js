const express = require("express");
const studentRoutes = require("./routes/studentRoutes");

const app = express();

// Fallback to 3000 if the environment port is busy or undefined
const PORT = process.env.PORT || 3000;

// Global Middleware
app.use(express.json());

// API Routes
app.use("/", studentRoutes);

// Server initialization with dynamic port handling
const server = app.listen(PORT, () => {
    console.log(`[SUCCESS] Server safely running on port ${PORT}`);
});

// Graceful error handling for busy ports
server.on("error", (error) => {
    if (error.code === "EADDRINUSE") {
        console.error(`[ERROR] Port ${PORT} is already in use. Retrying with an alternative port...`);
        // Optional: Automate switching to a random free port
        server.listen(0); 
    } else {
        console.error("[ERROR] Server failed to start:", error.message);
    }
});
