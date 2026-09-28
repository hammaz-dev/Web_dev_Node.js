const express = require("express");
const studentRoutes = require("./routes/studentRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// 1. BUILT-IN MIDDLEWARE (For parsing incoming request data)
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded data (HTML forms)

// 2. CUSTOM APPLICATION-LEVEL MIDDLEWARE (Logger)
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} request made to: ${req.url}`);
    next(); // Passes control to the next middleware or route handler
});

// 3. ROUTER-LEVEL MIDDLEWARE (Your student routes)
app.use("/", studentRoutes);

// 4. GLOBAL ERROR-HANDLING MIDDLEWARE (Catches unexpected errors across the app)
app.use((err, req, res, next) => {
    console.error("[SERVER ERROR]:", err.stack);
    res.status(500).json({
        success: false,
        message: "Something went wrong on the server!",
        error: process.env.NODE_ENV === "development" ? err.message : {}
    });
});

// --- SERVER START ---
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Handle port busy error
server.on("error", (error) => {
    if (error.code === "EADDRINUSE") {
        console.error(`Port ${PORT} is busy. Retrying on a random free port...`);
        server.listen(0);
    }
});
