# Helpdesk Ticket Management System

A full-stack Helpdesk Ticket Management System that allows users to create and manage support tickets while administrators can manage and track ticket activity.

This project was initially built with **Vanilla JavaScript** for the frontend. A **React-based frontend** is also being developed to improve component reusability and frontend architecture.

## Project Overview

The Helpdesk system provides a structured way to manage support requests, track ticket status, and organize tickets by category and priority.

### Features

- User registration and login
- JWT-based authentication with access and refresh tokens
- Protected routes and role-based authorization
- Create, view, update, and delete tickets
- Search tickets by relevant text
- Filter tickets by category, status, and priority
- Pagination for ticket listings
- Ticket comments
- Administrative ticket management

## Tech Stack

### Frontend — Vanilla JavaScript
- HTML5
- CSS3
- JavaScript
- DOM Manipulation
- Fetch API

### Frontend — React
- React.js
- Component-based UI development
- API integration

*React frontend implementation status: [In Progress]*

### Backend
- Node.js
- Express.js
- REST APIs
- JWT Authentication
- Middleware

### Database
- MongoDB
- Mongoose

### Tools
- Git and GitHub
- Postman
- npm

## Frontend Versions

### 1. Vanilla JavaScript Version

The original frontend was developed using HTML, CSS, and plain JavaScript without a frontend framework. It communicates with the Express backend through API requests.

### 2. React Version

The React frontend is being developed as a separate implementation of the same Helpdesk application. The goal is to organize the UI into reusable components and manage application state using React.

**Note:** Update this section to reflect the actual completion status and features of the React version.

## Project Structure

```text
helpdesk/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── middleware/
├── frontend/
│   └── Vanilla JavaScript frontend
├── react-frontend/
│   └── React frontend (if maintained separately)
└── README.md
```

*The structure above is illustrative. Adjust folder names to match the actual repository.*

## Getting Started

1. Clone the repository.
2. Install backend dependencies.
3. Configure environment variables.
4. Connect the application to MongoDB.
5. Start the backend server.
6. Run the frontend version you want to use.

Refer to the backend configuration and scripts in the repository for the exact commands and required environment variables.

## Learning Outcomes

- Building REST APIs with Node.js and Express.js
- Working with MongoDB and Mongoose
- Implementing authentication and authorization
- Connecting frontend applications to backend APIs
- Managing search, filtering, and pagination
- Learning the transition from Vanilla JavaScript to React

## Future Improvements

- Complete and refine the React frontend
- Improve responsive UI and user experience
- Add automated tests
- Improve error handling and validation

## Author

**MD Talha**

GitHub: [tyagitalha](https://github.com/tyagitalha)
