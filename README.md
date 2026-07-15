# Product Image API

A REST API for managing products with image uploads built with
Node.js, Express.js, MongoDB and Cloudinary.

## Features
- User authentication with JWT
- Product CRUD with image uploads
- Images stored on Cloudinary
- Old images deleted when updated
- Protected routes for authenticated users

## Tech Stack
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Multer
- Cloudinary
- Joi
- dotenv

## How to Run
npm install
npm run dev

## API Endpoints
- POST   /auth/register         - Register a user
- POST   /auth/login            - Login a user
- GET    /products              - Get all products
- GET    /products/:id          - Get a product by ID
- POST   /products              - Create a product (protected)
- PUT    /products/:id          - Update a product (protected)
- DELETE /products/:id          - Delete a product (protected)