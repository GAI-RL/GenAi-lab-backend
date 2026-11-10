const { createClient } = require("@supabase/supabase-js");

// Get credentials from environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

// Check credentials
if (!supabaseUrl || !supabaseSecretKey) {
  throw new Error("Supabase credentials are missing!");
}

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseSecretKey);

console.log("Supabase client initialized!");

module.exports = supabase;
