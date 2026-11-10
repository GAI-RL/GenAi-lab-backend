const verifyWebhook = (req, res, next) => {
  const secret = req.headers["x-webhook-secret"];
  const webhookSecret = process.env.WEBHOOK_SECRET;

  // Check whether the server secret is configured
  if (!webhookSecret) {
    console.error("WEBHOOK_SECRET is not configured!");

    return res.status(500).json({
      success: false,
      message: "Webhook security is not configured",
    });
  }

  // Verify incoming webhook secret
  if (!secret || secret !== webhookSecret) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid webhook secret",
    });
  }

  next();
};

module.exports = verifyWebhook;
