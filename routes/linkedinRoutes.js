const express = require("express");
const router = express.Router();

const { getPosts, createPost } = require("../controllers/linkedinController");

// GET all LinkedIn posts
router.get("/posts", getPosts);

// POST a new LinkedIn post
const verifyWebhook = require("../middleware/verifyWebhook");

router.post("/webhook", verifyWebhook, createPost);
module.exports = router;
