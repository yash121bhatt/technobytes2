require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/user.model");

const ADMIN_EMAIL = "admin@example.com";
const ADMIN_PASSWORD = "12345678";

const run = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const existing = await User.findOne({ email: ADMIN_EMAIL });
        if (existing) {
            console.log("Admin user already exists");
            return process.exit(0);
        }
        const admin = new User({
            name: "Admin",
            email: ADMIN_EMAIL,
            password: ADMIN_PASSWORD,
            role: "admin"
        });
        await admin.save();
        console.log("Admin user created:", ADMIN_EMAIL);
        process.exit(0);
    } catch (error) {
        console.error("Error seeding admin:", error);
        process.exit(1);
    }
};

run();
