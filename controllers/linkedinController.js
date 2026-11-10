const supabase = require("../config/supabase");

// GET: Retrieve all LinkedIn posts
const getPosts = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("linkedin_posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return res.status(200).json({
      success: true,
      posts: data,
    });
  } catch (error) {
    console.error("Fetch error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch LinkedIn posts",
    });
  }
};

// POST: Save a new LinkedIn post
const createPost = async (req, res) => {
  try {
    const { post_id, text, image_url, post_url, created_at } = req.body;

    // Validate LinkedIn post URL
    let isValidPostUrl = false;

    try {
      const url = new URL(post_url);
      isValidPostUrl = url.protocol === "https:" || url.protocol === "http:";
    } catch {
      isValidPostUrl = false;
    }

    // Validate image URL (optional)
    let isValidImageUrl = true;

    if (image_url) {
      try {
        const url = new URL(image_url);
        isValidImageUrl = url.protocol === "https:" || url.protocol === "http:";
      } catch {
        isValidImageUrl = false;
      }
    }

    // Check all required fields
    if (
      !isValidPostUrl ||
      !isValidImageUrl ||
      typeof post_id !== "string" ||
      !post_id.trim() ||
      typeof text !== "string" ||
      !text.trim() ||
      typeof post_url !== "string" ||
      !post_url.trim() ||
      typeof created_at !== "string" ||
      !created_at.trim() ||
      isNaN(Date.parse(created_at))
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing post fields",
      });
    }

    // Insert post into Supabase
    const { data, error } = await supabase
      .from("linkedin_posts")
      .insert([
        {
          post_id,
          text,
          image_url: image_url || null,
          post_url,
          created_at,
        },
      ])
      .select()
      .single();

    // Handle duplicate posts
    if (error) {
      if (error.code === "23505") {
        return res.status(409).json({
          success: false,
          message: "This post already exists",
        });
      }

      throw error;
    }

    return res.status(201).json({
      success: true,
      message: "LinkedIn post saved successfully!",
      post: data,
    });
  } catch (error) {
    console.error("Save error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to save LinkedIn post",
    });
  }
};

// Export both functions
module.exports = { getPosts, createPost };
