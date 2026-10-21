const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");

const signToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

module.exports.Register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) {
        throw new ApiError(409, "Email already registered");
    }
    const user = new User({ name, email, password });
    await user.save();
    const token = signToken(user);
    return res.status(201).json({ success: true, token, data: user.toSafeJSON() });
});

module.exports.Login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
        throw new ApiError(401, "Invalid email or password");
    }
    const token = signToken(user);
    return res.status(200).json({ success: true, token, data: user.toSafeJSON() });
});

module.exports.Me = asyncHandler(async (req, res) => {
    return res.status(200).json({ success: true, data: req.user.toSafeJSON() });
});

module.exports.UpdateProfile = asyncHandler(async (req, res) => {
    const { name } = req.body;
    req.user.name = name;
    await req.user.save();
    return res.status(200).json({ success: true, message: "Profile updated successfully", data: req.user.toSafeJSON() });
});

module.exports.ChangePassword = asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    if (currentPassword === newPassword) {
        throw new ApiError(400, "New password must be different from current password");
    }
    const isMatch = await req.user.comparePassword(currentPassword);
    if (!isMatch) {
        throw new ApiError(401, "Current password is incorrect");
    }
    req.user.password = newPassword;
    await req.user.save();
    return res.status(200).json({ success: true, message: "Password changed successfully" });
});
