const User=require("../model/user");

exports.checkSession = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const lastLogin = new Date(user.lastLogin).getTime();
    const now = Date.now();

    const SESSION_LIMIT = 24 * 60 * 60 * 1000; // 24 hours

    if (now - lastLogin > SESSION_LIMIT) {
      return res.status(401).json({
        success: false,
        message: "Session expired. Please login again.",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: "Session check failed" });
  }
};
