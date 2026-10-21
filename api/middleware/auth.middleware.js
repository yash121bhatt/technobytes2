const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

module.exports.authRequired = async (req, res, next) => {
    try {
        const header = req.headers.authorization;
        if (!header || !header.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: "Authentication required" });
        }
        const token = header.split(" ")[1];
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(payload.id);
        if (!user) {
            return res.status(401).json({ success: false, message: "User no longer exists" });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
};

module.exports.adminRequired = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        return next();
    }
    return res.status(403).json({ success: false, message: "Admin access required" });
};
