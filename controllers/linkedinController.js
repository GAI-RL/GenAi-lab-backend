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

    if (!post_id || !text || !post_url || !created_at) {
      return res.status(400).json({
        success: false,
        message: "Missing required post fields",
      });
    }

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
