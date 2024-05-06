# Task Manager Application

Welcome to the Task Manager application. This document provides detailed instructions on how to set up and run the project. The application is built with a Node.js backend and a React frontend, utilizing MongoDB as the database.

## System Requirements

Before you begin, make sure you have the following installed:
- Node.js (v14 or newer recommended)
- npm (usually comes with Node.js)
- MongoDB (either locally or a MongoDB Atlas cluster)

## Environment Setup

### Backend Configuration

1. **MongoDB Setup:**
   - Set up a MongoDB cluster. You can use MongoDB Atlas for a cloud-based solution, or install MongoDB locally.
   - Create a database for your application.

2. **Environment Variables:**
   - Navigate to the `backend` directory of your project.
   - Create a `.env` file to store your environment variables. Here’s what you need:
     ```
     PORT=3000
     MONGO_URI=your_mongodb_connection_string_here
     JWT_SECRET=your_jwt_secret_here
     DB_NAME=your_database_name_here
     ```

   Replace `your_mongodb_connection_string_here`, `your_jwt_secret_here`, and `your_database_name_here` with your actual MongoDB URI, a secret key for JWT, and the name of your database.

### Frontend Configuration

No environment variables are required for the frontend to run in prod mode. However, ensure that the backend URL is correctly set up if your'e checking with a different BE setup.

## Installation

 **Clone the Repository:**
   ```
   git clone https://github.com/your-repository/task-manager.git
   cd task-manager
   ```

## Starting the Service

To start the full application, ensuring both frontend and backend are serving:
```
npm start
```
This will launch the backend server, which also serves the built frontend assets. Open a web browser and navigate to `http://localhost:<PORT>/` to access the application, replacing `<PORT>` with the port number you specified in your backend `.env` file