const verifyWebhook = (req, res, next) => {
  const secret = req.headers["x-webhook-secret"];

  if (!secret || secret !== process.env.WEBHOOK_SECRET) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid webhook secret",
    });
  }

  next();
};

module.exports = verifyWebhook;
