# AI_MOCK Project Overview
=====================================

The AI_MOCK project is a comprehensive application that utilizes artificial intelligence to provide a mock interview platform. The project consists of two primary components: a client-side application built with React and a server-side API built with Express.js.

## Header & Badges
--------------------

[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen.svg)](https://travis-ci.org/kaihere14/AI_MOCK)
[![License](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Version](https://img.shields.io/badge/Version-1.0.0-yellow.svg)](https://semver.org/spec/v2.0.0.html)

## Overview
------------

The AI_MOCK project aims to provide a realistic and interactive interview experience for users. The client-side application is built with React and utilizes various libraries such as Tailwind CSS and React Router DOM. The server-side API is built with Express.js and utilizes MongoDB as the primary database.

## Features
------------

*   **User Authentication**: Users can create accounts and log in to access the interview platform.
*   **Interview Questions**: The platform provides a wide range of interview questions, including technical and behavioral questions.
*   **Mock Interviews**: Users can participate in mock interviews, which are simulated interviews that help users prepare for real interviews.
*   **Notes and Feedback**: Users can take notes and receive feedback on their performance during the mock interviews.

## Tech Stack
-------------

*   **Frontend**: React, Tailwind CSS, React Router DOM
*   **Backend**: Express.js, MongoDB
*   **Database**: MongoDB
*   **Dependencies**:
    *   `@tailwindcss/cli`: ^4.1.16
    *   `@tailwindcss/vite`: ^4.1.16
    *   `axios`: ^1.13.2
    *   `lucide-react`: ^0.552.0
    *   `react`: ^19.1.1
    *   `react-dom`: ^19.1.1
    *   `react-hot-toast`: ^2.6.0
    *   `react-router-dom`: ^7.9.5
    *   `tailwindcss`: ^4.1.16

## Project Structure
---------------------

The project consists of two primary directories: `client` and `server`. The `client` directory contains the client-side application built with React, while the `server` directory contains the server-side API built with Express.js.

*   `client/`
    *   `public/`
    *   `src/`
        *   `App.css`
        *   `App.jsx`
        *   `assets/`
        *   `components/`
        *   `context/`
        *   `index.css`
        *   `main.jsx`
        *   `pages/`
*   `server/`
    *   `src/`
        *   `controller/`
        *   `databases/`
        *   `index.js`
        *   `middlewares/`
        *   `models/`
        *   `routes/`

## Getting Started
-------------------

### Prerequisites

*   Node.js: ^18.0.0
*   npm: ^8.0.0
*   MongoDB: ^6.0.0

### Installation

1.  Clone the repository: `git clone https://github.com/kaihere14/AI_MOCK.git`
2.  Navigate to the project directory: `cd AI_MOCK`
3.  Install dependencies: `npm install`
4.  Start the server: `npm run dev`

### Configuration

*   Create a `.env` file in the root directory with the following variables:
    *   `PORT`: The port number for the server.
    *   `MONGO_URI`: The MongoDB connection string.

Example `.env` file:

```makefile
PORT=4400
MONGO_URI=mongodb://localhost:27017/ai_mock
```

## Usage
-----

### Client-Side Application

1.  Navigate to the client directory: `cd client`
2.  Install dependencies: `npm install`
3.  Start the client: `npm run dev`
4.  Open the application in a web browser: `http://localhost:5173`

### Server-Side API

1.  Navigate to the server directory: `cd server`
2.  Install dependencies: `npm install`
3.  Start the server: `npm run dev`
4.  Use a tool like Postman to test the API endpoints.

## API Documentation
---------------------

### Endpoints

*   **GET /api/users**: Retrieves a list of all users.
*   **POST /api/users**: Creates a new user.
*   **GET /api/questions**: Retrieves a list of all questions.
*   **POST /api/questions**: Creates a new question.
*   **GET /api/tests**: Retrieves a list of all tests.
*   **POST /api/tests**: Creates a new test.
*   **GET /api/interviews**: Retrieves a list of all interviews.
*   **POST /api/interviews**: Creates a new interview.
*   **GET /api/notes**: Retrieves a list of all notes.
*   **POST /api/notes**: Creates a new note.

### Request/Response Examples

**GET /api/users**

*   Request: `GET /api/users HTTP/1.1`
*   Response: `HTTP/1.1 200 OK`
    ```json
[
  {
    "_id": "1234567890",
    "name": "John Doe",
    "email": "john.doe@example.com"
  },
  {
    "_id": "2345678901",
    "name": "Jane Doe",
    "email": "jane.doe@example.com"
  }
]
```

## Development
--------------

### Setting Up the Development Environment

1.  Install Node.js and npm.
2.  Clone the repository.
3.  Navigate to the project directory.
4.  Install dependencies.

### Running Tests

1.  Navigate to the client directory.
2.  Run the tests: `npm run test`

### Code Style Guidelines

*   Use JavaScript for the client-side application.
*   Use TypeScript for the server-side API.
*   Use a consistent coding style throughout the project.
*   Use comments to explain complex code.

## Deployment
------------

### Production Deployment

1.  Build the client-side application: `npm run build`
2.  Deploy the client-side application to a hosting platform.
3.  Deploy the server-side API to a cloud platform.

### Docker Containerization

1.  Create a Dockerfile for the client-side application.
2.  Create a Dockerfile for the server-side API.
3.  Build the Docker images.
4.  Deploy the Docker containers to a cloud platform.

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