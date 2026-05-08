
# 🤖 AI_MOCK Project Overview

AI_MOCK is a full-stack platform designed to simulate realistic AI-driven interview experiences. It leverages a modern React frontend and a robust Express.js backend to help users prepare for technical and behavioral interviews through interactive sessions and automated feedback.
## Header & Badges
--------------------

[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen.svg)](https://travis-ci.org/kaihere14/AI_MOCK)
[![License](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Version](https://img.shields.io/badge/Version-1.0.0-yellow.svg)](https://semver.org/spec/v2.0.0.html)

## 📝 Overview

The AI_MOCK project provides an interactive environment for users to practice interview skills. By utilizing AI-generated questions and providing detailed performance analytics, the application helps candidates refine their responses. The architecture is split into a Vite-powered React client and a Node.js/Express server with MongoDB for data persistence.
## ✨ Features

*   **AI-Powered Interviews**: Interactive sessions with dynamically generated questions.
*   **User Authentication**: Secure management of user profiles and interview history.
*   **Comprehensive Question Bank**: Diverse sets of technical and behavioral questions.
*   **Performance Analytics**: Detailed feedback and notes on interview performance.
*   **Session Management**: Tools to track, review, and manage multiple interview attempts.
## 💻 Tech Stack

*   **Frontend**: React 19, Tailwind CSS 4, React Router 7, Axios
*   **Backend**: Node.js, Express.js
*   **Database**: MongoDB
*   **UI Components**: Lucide React, React Hot Toast
*   **Build Tools**: Vite, ESLint
## 📂 Project Structure


├── client/                # React frontend (Vite)
│   ├── src/components/    # Shared UI components
│   ├── src/context/       # Global state management
│   ├── src/pages/         # Application views
│   └── vercel.json        # Vercel deployment config
└── server/                # Express.js backend
    ├── src/controller/    # Business logic handlers
    ├── src/models/        # MongoDB data schemas
    ├── src/routes/        # API route definitions
    ├── src/middlewares/   # Request processing logic
    └── src/databases/     # Database connection setup

## 🚀 Getting Started

### Prerequisites

*   Node.js (v18+)
*   npm (v8+)
*   MongoDB (v6+)

### Installation

1.  **Clone the repository**:
    bash
    git clone https://github.com/kaihere14/AI_MOCK.git
    cd AI_MOCK
    

2.  **Setup Server**:
    bash
    cd server && npm install
    

3.  **Setup Client**:
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
2. Start the backend: `npm run dev` (Default port: 4400)

### Running the Client
1. Navigate to the client directory: `cd client`
2. Start the Vite dev server: `npm run dev`
3. Access the app at: `http://localhost:5173`
## 📖 API Documentation

### Endpoints

*   **Users**: `GET /api/users`, `POST /api/users`
*   **Questions**: `GET /api/questions`, `POST /api/questions`
*   **Tests**: `GET /api/tests`, `POST /api/tests`
*   **Interviews**: `GET /api/interviews`, `POST /api/interviews`
*   **Notes**: `GET /api/notes`, `POST /api/notes`

### Sample User Response


[
  {
    "_id": "1234567890",
    "name": "John Doe",
    "email": "john.doe@example.com"
  }
]

## 🛠️ Development

### Environment Setup
Ensure a local MongoDB instance is active or provide a remote `MONGO_URI`. The frontend uses Vite for rapid development and hot reloading.

### Code Style
*   **Backend**: Follows the MVC (Model-View-Controller) pattern.
*   **Frontend**: Functional components with React Hooks and Context API.
*   **Linting**: ESLint is configured in the client directory to maintain code quality.
## 🌐 Deployment

### Client Deployment
The frontend is configured for **Vercel** via `vercel.json`. Ensure environment variables for the API base URL are set if applicable.

### Server Deployment
The backend can be hosted on any Node.js-compatible platform (e.g., Render, Railway, Heroku). Configure `MONGO_URI` and `PORT` in the production environment settings.
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