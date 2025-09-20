# MERN Login & Registration

This is a simple MERN (MongoDB, Express, React, Node.js) stack project for user login and registration.

## Features

- User registration with email and password
- User login with JWT authentication
- Protected routes
- Password hashing with bcrypt
- Environment variables management with dotenv

## Technologies Used

- Frontend: React, Vite, Axios, TailwindCSS, Redux Toolkit, React-Router-Dom, @heroicons/react
- Backend: Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs, CORS, express-validator, dotenv
- Database: MongoDB (local or cloud with MongoDB Atlas)

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB installed and running
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/maghwiPanchal/MERNloginreg.git
cd mern-login-reg
```

2. Setup backend:

```bash
cd backend
npm install
```

3. Setup frontend:

```bash
cd ../frontend
npm install
```

### Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Replace `your_mongodb_connection_string` and `your_jwt_secret` with your actual MongoDB connection URI and a secret key for JWT.

### Running the Application

## CORS Configuration

The backend server uses CORS to allow requests from the frontend. By default, it allows origins such as `http://localhost:5173` or `http://localhost:5174` (default Vite ports). If you change the frontend port, update the CORS allowed origins accordingly in the backend configuration.

## Running the Application


1. Start the backend server:

```bash
cd backend
npm run dev
```

2. Start the frontend development server:

```bash
cd ../frontend
npm run dev
```

The frontend will be available at what the port Vite assigns.

## Usage

- Register a new user on the registration page.
- Login with the registered credentials.
- Access protected routes after login.

## License

All rights reserved. This project is not licensed for reuse or redistribution.


