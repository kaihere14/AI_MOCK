# PrepDash

PrepDash is an interview preparation platform designed to help candidates prepare for technical hiring processes. It provides interactive practice tests, interview tracking, performance analytics, and preparation notes management.

## Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Project Structure](#project-structure)
- [License](#license)

## Features

- **User Authentication & Profile Management**: Email and password registration, authentication with JWT access and refresh tokens, password changes, profile retrieval, and account deletion.
- **Practice Test Sessions**: Interactive test rounds for Aptitude, Coding, and HR topics across Easy, Medium, and Hard difficulty levels. Includes timed test sessions, question navigation, and flagging questions for review.
- **Performance Analytics & Reports**: Calculation of test scores, accuracy percentages, time spent, and performance breakdown summaries with individual report pages.
- **Interview Tracking**: Management of job interviews with attributes for role, company name, salary, location, and tags. Includes filtering by role, time frame, and salary range.
- **Preparation Notes**: Note-taking system supporting titles, markdown-style content, tags, tag-based filtering, text search, editing, and note deletion.

## Requirements

- Node.js
- npm
- MongoDB database instance

## Installation

1. Clone the repository to your local machine.
2. Install dependencies for the backend server:

```bash
cd server
npm install
```

3. Install dependencies for the frontend client:

```bash
cd client
npm install
```

## Configuration

Set up environment variables for both server and client applications.

### Server Environment Variables

Create a `.env` file in the `server` directory with the following variables:

- `PORT`: Port number for the server (defaults to 4400 if omitted).
- `MONGO_URI`: Connection string for MongoDB database.
- `JWT_SECRET`: Secret key used for signing JWT access and refresh tokens.

### Client Environment Variables

Create a `.env` file in the `client` directory with the following variable:

- `VITE_BACKEND_URL`: Base URL of the running backend server (e.g., `http://localhost:4400`).

## Usage

### Running the Server

Start the backend server in development mode with automatic reload via nodemon:

```bash
cd server
npm run dev
```

Start the backend server in production mode:

```bash
cd server
npm start
```

### Running the Client

Start the frontend Vite development server:

```bash
cd client
npm run dev
```

Build the frontend project for production:

```bash
cd client
npm run build
```

Preview the local production build:

```bash
cd client
npm run preview
```

Run ESLint code verification:

```bash
cd client
npm run lint
```

## API Reference

### User Routes (`/api/users`)

- `POST /api/users/register` - Register a new user account.
- `POST /api/users/login` - Authenticate a user and receive access and refresh tokens.
- `GET /api/users/profile` - Fetch the authenticated user's profile information. Requires JWT.
- `POST /api/users/change-password` - Change the current user's password. Requires JWT.
- `DELETE /api/users/delete` - Permanently delete the user account. Requires JWT.
- `POST /api/users/refresh-token` - Refresh an expired access token using a refresh token.

### Question Routes (`/api/questions`)

- `POST /api/questions/create` - Create a new question (Aptitude, Coding, or HR). Requires JWT.
- `GET /api/questions/:id` - Fetch question details excluding the correct answer. Requires JWT and Admin role.

### Test Routes (`/api/tests`)

- `POST /api/tests/create-test` - Initialize a new test session based on type and difficulty. Requires JWT.
- `POST /api/tests/update-answer` - Submit an answer for a specific question within an active test session. Requires JWT.
- `POST /api/tests/finalize-test/:testSessionId` - Finalize a test session and generate test results. Requires JWT.
- `GET /api/tests/test-results` - Fetch all completed test result records for the user. Requires JWT.
- `GET /api/tests/test-session/:id` - Fetch data for a specific test session. Requires JWT.

### Interview Routes (`/api/interviews`)

- `POST /api/interviews/register` - Create a new interview entry. Requires JWT.
- `GET /api/interviews/getallinterviews` - Retrieve all interview entries created by the user. Requires JWT.
- `GET /api/interviews/getinterview/:id` - Retrieve details for a specific interview. Requires JWT.
- `DELETE /api/interviews/deleteinterview/:id` - Delete an interview entry. Requires JWT.

### Note Routes (`/api/notes`)

- `POST /api/notes/createnote` - Create a new preparation note. Requires JWT.
- `GET /api/notes/getnotes` - Retrieve all notes created by the user. Requires JWT.
- `PUT /api/notes/updatenote/:noteId` - Update an existing note's title, content, or tags. Requires JWT.
- `DELETE /api/notes/deletenote/:noteId` - Delete a note. Requires JWT.

## Project Structure

```
.
├── client/
│   ├── src/
│   │   ├── components/       # Reusable UI components (Navbar, Sidebar, Cards, Modals)
│   │   ├── context/          # React Context API for global application state
│   │   ├── pages/            # Application pages (Home, Interviews, Practice, Notes, Reports, Profile, Auth)
│   │   ├── App.jsx           # App component with route definitions and route guards
│   │   └── main.jsx          # Entry point rendering React DOM and router
│   ├── package.json          # Client dependencies and scripts
│   ├── vite.config.js        # Vite build and plugin configuration
│   └── eslint.config.js      # ESLint configuration
└── server/
    ├── src/
    │   ├── controller/       # Request handlers for users, interviews, tests, questions, and notes
    │   ├── databases/        # MongoDB database connection setup
    │   ├── middlewares/      # Authentication (JWT) and role verification middlewares
    │   ├── models/           # Mongoose schemas for User, Interview, Question, Note, TestSession, and TestResult
    │   ├── routes/           # Express route definitions
    │   └── index.js          # Server entry point and middleware assembly
    └── package.json          # Server dependencies and scripts
```

## License

This project is licensed under the ISC License.