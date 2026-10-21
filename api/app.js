const dotenv = require("dotenv");

dotenv.config();

const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const authRouter = require("./routes/auth.route");
const contactRouter = require("./routes/contact.route");
const swaggerSpec = require("./config/swagger");
const { notFound, errorHandler } = require("./middleware/error.middleware");

const allowedOrigins = (
    process.env.CLIENT_URL || "http://localhost:5173")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

const app = express();

app.use(
    cors({
        origin: allowedOrigins,
        credentials: true
    })
);
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Techno Bytes API - 2 is running");
});

app.use("/api-docs/swagger.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/auth", authRouter);
app.use("/api/contacts", contactRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;