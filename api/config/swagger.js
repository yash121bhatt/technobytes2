const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Techno Bytes API - 2",
            version: "1.0.0",
            description: "Contact form API with JWT authentication.\n\nAdmin user: `admin@example.com` / `12345678` (see `npm run seed:admin`).\n\nProtected contact routes (list/view/delete) require a Bearer token with `admin` role."
        },
        servers: [
            {
                url: "https://techno-bytes-2.onrender.com",
                description: "Production server"
            },
            {
                url: "http://localhost:4000",
                description: "Local server"
            }
        ],
        tags: [
            { name: "Auth", description: "Authentication endpoints" },
            { name: "Contacts", description: "Contact form endpoints" }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            },
            schemas: {
                RegisterRequest: {
                    type: "object",
                    required: ["name", "email", "password"],
                    properties: {
                        name: { type: "string", example: "Rohit" },
                        email: { type: "string", format: "email", example: "rohit@test.com" },
                        password: { type: "string", format: "password", minLength: 6, example: "secret123" }
                    }
                },
                LoginRequest: {
                    type: "object",
                    required: ["email", "password"],
                    properties: {
                        email: { type: "string", example: "admin@example.com" },
                        password: { type: "string", format: "password", example: "12345678" }
                    }
                },
                User: {
                    type: "object",
                    properties: {
                        _id: { type: "string", example: "6a7dd92bcd1cda771392b93c" },
                        name: { type: "string", example: "Admin" },
                        email: { type: "string", example: "admin@example.com" },
                        role: { type: "string", enum: ["admin", "user"], example: "admin" },
                        createdAt: { type: "string", format: "date-time" }
                    }
                },
                AuthResponse: {
                    type: "object",
                    properties: {
                        success: { type: "boolean", example: true },
                        token: { type: "string", example: "eyJhbGciOiJIUzI1NiIs..." },
                        data: { $ref: "#/components/schemas/User" }
                    }
                },
                UpdateProfileRequest: {
                    type: "object",
                    required: ["name"],
                    properties: {
                        name: { type: "string", minLength: 1, maxLength: 100, example: "Rohit Kumar" }
                    }
                },
                ChangePasswordRequest: {
                    type: "object",
                    required: ["currentPassword", "newPassword"],
                    properties: {
                        currentPassword: { type: "string", format: "password", example: "12345678" },
                        newPassword: { type: "string", format: "password", minLength: 6, example: "newSecret123" }
                    }
                },
                ProfileUpdateResponse: {
                    type: "object",
                    properties: {
                        success: { type: "boolean", example: true },
                        message: { type: "string", example: "Profile updated successfully" },
                        data: { $ref: "#/components/schemas/User" }
                    }
                },
                ContactRequest: {
                    type: "object",
                    required: ["name", "email", "phone", "subject", "message"],
                    properties: {
                        name: { type: "string", maxLength: 100, example: "John Doe" },
                        email: { type: "string", format: "email", maxLength: 100, example: "john@example.com" },
                        phone: { type: "number", example: 9876543210 },
                        subject: { type: "string", maxLength: 200, example: "Project inquiry" },
                        message: { type: "string", maxLength: 2000, example: "I would like to know more about your services." }
                    }
                },
                Contact: {
                    type: "object",
                    properties: {
                        _id: { type: "string", example: "6a7dd9420c4d967bb6bd466a" },
                        name: { type: "string", example: "John Doe" },
                        email: { type: "string", example: "john@example.com" },
                        phone: { type: "number", example: 9876543210 },
                        subject: { type: "string", example: "Project inquiry" },
                        message: { type: "string", example: "Hello!" },
                        createdAt: { type: "string", format: "date-time" },
                        updatedAt: { type: "string", format: "date-time" }
                    }
                },
                ContactListResponse: {
                    type: "object",
                    properties: {
                        success: { type: "boolean", example: true },
                        data: {
                            type: "array",
                            items: { $ref: "#/components/schemas/Contact" }
                        }
                    }
                },
                ApiResponse: {
                    type: "object",
                    properties: {
                        success: { type: "boolean", example: true },
                        message: { type: "string", example: "Contact added successfully" }
                    }
                },
                ErrorResponse: {
                    type: "object",
                    properties: {
                        success: { type: "boolean", example: false },
                        message: { type: "string", example: "\"email\" must be a valid email" },
                        errors: {
                            type: "array",
                            items: { type: "string" }
                        }
                    }
                }
            }
        }
    },
    apis: ["./routes/*.js"]
};

module.exports = swaggerJsdoc(options);
