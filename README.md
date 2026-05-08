
# 🤖 AI_MOCK Project Overview

AI_MOCK is a comprehensive full-stack application designed to provide an AI-driven mock interview experience. The platform enables users to practice their interview skills through simulated sessions, featuring a modern React frontend and a robust Express.js backend powered by MongoDB.
## Header & Badges
--------------------

[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen.svg)](https://travis-ci.org/kaihere14/AI_MOCK)
[![License](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Version](https://img.shields.io/badge/Version-1.0.0-yellow.svg)](https://semver.org/spec/v2.0.0.html)

## 📝 Overview

The AI_MOCK project aims to bridge the gap between preparation and performance by providing a realistic, interactive interview environment. Users can engage with AI-generated questions, receive feedback, and track their progress. The application leverages a decoupled architecture with a Vite-powered React client and a Node.js server.
## ✨ Features

*   **User Authentication**: Secure account management for personalized interview tracking.
*   **AI Mock Interviews**: Interactive sessions simulating real-world technical and behavioral interviews.
*   **Dynamic Question Bank**: A diverse range of questions across various domains.
*   **Feedback & Analytics**: Detailed notes and performance feedback to help users improve.
*   **Session Management**: Create and manage multiple interview tests and notes.
## 💻 Tech Stack

*   **Frontend**: React 19, Tailwind CSS 4, React Router 7, Axios
*   **Backend**: Node.js, Express.js
*   **Database**: MongoDB
*   **UI Components**: Lucide React, React Hot Toast
*   **Build Tools**: Vite, ESLint
## 📂 Project Structure


├── client/                # React frontend application
│   ├── src/components/    # Reusable UI components
│   ├── src/context/       # React Context for state management
│   ├── src/pages/         # Page-level components
│   └── vercel.json        # Deployment configuration
└── server/                # Express.js backend API
    ├── src/controller/    # Request handlers
    ├── src/models/        # MongoDB schemas
    ├── src/routes/        # API endpoint definitions
    └── src/middlewares/   # Custom middleware logic

## 🚀 Getting Started

### Prerequisites

*   Node.js: ^18.0.0
*   npm: ^8.0.0
*   MongoDB: ^6.0.0

### Installation

1.  **Clone the repository**:
    bash
    git clone https://github.com/kaihere14/AI_MOCK.git
    cd AI_MOCK
    
2.  **Install Server Dependencies**:
    bash
    cd server && npm install
    
3.  **Install Client Dependencies**:
    bash
    cd ../client && npm install
    

### Configuration

Create a `.env` file in the `server` directory:

env
PORT=4400
MONGO_URI=mongodb://localhost:27017/ai_mock

## 🛠️ Usage

### Running the Server
1. Navigate to the server directory: `cd server`
2. Start the development server: `npm run dev` (Runs on port 4400 by default)

### Running the Client
1. Navigate to the client directory: `cd client`
2. Start the Vite development server: `npm run dev`
3. Open your browser at: `http://localhost:5173`
## 📖 API Documentation

### Endpoints

*   **Users**: `GET /api/users`, `POST /api/users`
*   **Questions**: `GET /api/questions`, `POST /api/questions`
*   **Tests**: `GET /api/tests`, `POST /api/tests`
*   **Interviews**: `GET /api/interviews`, `POST /api/interviews`
*   **Notes**: `GET /api/notes`, `POST /api/notes`

### Sample Response (GET /api/users)

[
  {
    "_id": "1234567890",
    "name": "John Doe",
    "email": "john.doe@example.com"
  }
]

## 🛠️ Development

### Environment Setup
Ensure MongoDB is running locally or provide a valid `MONGO_URI` in the server configuration. The client uses Vite for fast hot-module replacement.

### Code Style
*   Maintain consistent naming conventions for components in `client/src/components`.
*   Follow the MVC pattern in the `server` directory (Models, Views/Routes, Controllers).
*   Use the provided ESLint configuration in the client to ensure code quality.
## 🌐 Deployment

### Client Deployment
The client is optimized for deployment on **Vercel**. Use the `vercel.json` configuration for routing and build settings.

### Server Deployment
The server can be deployed to any Node.js environment. Ensure that the `MONGO_URI` and `PORT` environment variables are correctly configured in your production environment.
## Contributing
------------

### How to Contribute

1.  Fork the repository.
2.  Create a new branch.
3.  Make changes to the code.
4.  Commit the changes.
5.  Push the changes to the remote repository.
6.  Create a pull request.

### Code Review Guidelines

*   Review the code for syntax errors.
*   Review the code for logical errors.
*   Review the code for performance issues.
*   Review the code for security vulnerabilities.

## Troubleshooting
-----------------

### Common Issues

*   **Error: Cannot find module 'express'**: Run `npm install express` to install the Express.js package.
*   **Error: Cannot connect to MongoDB**: Check the MongoDB connection string and ensure that the database is running.

### FAQ

*   **Q: How do I start the client-side application?**: Run `npm run dev` in the client directory.
*   **Q: How do I start the server-side API?**: Run `npm run dev` in the server directory.

## Roadmap
----------

*   **Version 1.0.0**: Initial release of the AI_MOCK project.
*   **Version 1.1.0**: Add support for user authentication.
*   **Version 1.2.0**: Add support for interview questions and mock interviews.

## License & Credits
--------------------

*   **License**: ISC
*   **Author**: kaihere14
*   **Contributors**: None

Note: This is a basic template, and you should add more details and examples as needed. Additionally, you should update the license and credits sections to reflect the actual license and contributors of your project.