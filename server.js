const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to the database
connectDb();

const app = express();

// Middleware
app.use(express.json()); // Parse JSON requests

// Routes
app.use("/api/v1/test", require("./routes/testroutes"));
app.use("/api/v1/auth", require("./routes/authroutes"));
app.use("/api/v1/user", require("./routes/userroutes"));
app.use("/api/v1/restaurant", require("./routes/resturentroutes"));
app.use("/api/v1/food", require("./routes/foodroutes"));
app.use("/api/v1/category", require("./routes/categoryroutes"));

// Default route for testing
app.get("/", (req, res) => {
  return res.status(200).send("<h1>Welcome to the Food App Server</h1>");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({
    success: false,
    message: "An unexpected error occurred.",
    error: err.message,
  });
});

// Define the port
const PORT = 4001

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});