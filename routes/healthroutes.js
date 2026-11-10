const express = require("express");

const router = express.Router();

// Health check API
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "GenAI Lab Backend is healthy!",
  });
});

module.exports = router;
