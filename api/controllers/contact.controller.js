const mongoose = require("mongoose");
const Contact = require("../models/contact.model");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");

module.exports.Add = asyncHandler(async (req, res) => {
    const { name, email, phone, subject, message } = req.body;
    const newContact = new Contact({ name, email, phone, subject, message });
    await newContact.save();
    return res.status(201).json({ success: true, message: "Contact added successfully" });
});

module.exports.List = asyncHandler(async (req, res) => {
    const contacts = await Contact.find();
    return res.status(200).json({ success: true, data: contacts });
});

module.exports.View = asyncHandler(async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        throw new ApiError(400, "Invalid contact id");
    }
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        throw new ApiError(404, "Contact not found");
    }
    return res.status(200).json({ success: true, data: contact });
});

module.exports.Delete = asyncHandler(async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        throw new ApiError(400, "Invalid contact id");
    }
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
        throw new ApiError(404, "Contact not found");
    }
    return res.status(200).json({ success: true, message: "Contact deleted successfully" });
});
