const express = require("express");
const studentRoutes = require("./routes/studentRoutes")

const app = express();
const PORT = 3000;

// Middleware to parse incoming JSON data from the client
app.use(express.json());

app.use("/",studentRoutes);
// app.use("")


// --- SERVER START ---
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
