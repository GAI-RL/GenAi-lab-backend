require("dotenv").config();
const express = require("express");
const cors = require("cors");

const supabase = require("./config/supabase");
const app = express();

// Import routes
const healthRoutes = require("./routes/healthroutes");
const linkedinRoutes = require("./routes/linkedinRoutes");
// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/health", healthRoutes);
app.use("/api/linkedin", linkedinRoutes);
// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
