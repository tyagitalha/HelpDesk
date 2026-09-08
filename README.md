# Helpdesk Ticket System

A full-stack Helpdesk / Support Ticket System built as a learning project.

## Goal

Understand how a real full-stack application works:

```text
Frontend → API → Backend → Authentication → Authorization → Database
```

## Tech Stack

- Frontend: HTML, CSS, Vanilla JavaScript
- Backend: Node.js, Express.js
- Database: MongoDB, Mongoose
- Authentication: Register, Login, Logout, Password Hashing, JWT or Sessions
- Tools: Git, GitHub, Postman/Bruno, MongoDB Atlas or local MongoDB

> React is not used.

## User Roles

### User
- Register / Login / Logout
- Create tickets
- View own tickets
- Open own tickets
- Update permitted information
- Delete permitted tickets
- Participate in ticket conversations

### Admin
- View all tickets
- View any ticket
- Change status
- Change priority
- See ticket creator
- Assign tickets

## Authentication vs Authorization

**Authentication:** Who are you?

**Authorization:** Are you allowed to do this?

Example:

```text
Talha owns Ticket #101
        ↓
Samiullah requests Ticket #101
        ↓
Backend checks permission
        ↓
Access denied
```

Authorization must be enforced by the backend.

## Ticket

A ticket contains:

- Title
- Description
- Category
- Priority
- Status
- Creator
- Assigned To
- Created Date

### Categories
- Hardware
- Software
- Network
- Account
- Other

### Priority
- Low
- Medium
- High

### Status
- Open
- In Progress
- Resolved
- Closed

New tickets start as `Open`.

## Database Relationships

```text
USER
│
├── role: USER
└── role: ADMIN
```

```text
USER
  │
  │ creates
  ↓
TICKET
```

```text
TICKET
  │
  │ assignedTo
  ↓
USER (ADMIN)
```

```text
USER
  │
  │ writes
  ↓
COMMENT
  │
  │ belongs to
  ↓
TICKET
```

## Main Application Flow

```text
User
  ↓
Frontend
  ↓
HTTP Request
  ↓
Express Route
  ↓
Middleware
  ↓
Controller
  ↓
Mongoose
  ↓
MongoDB
  ↓
Response
  ↓
Frontend
```

Important middleware concepts:

- Authentication
- Authorization
- Validation
- Error handling

## MVP

First target:

```text
Register
   ↓
Login
   ↓
Create Ticket
   ↓
Save in MongoDB
   ↓
View My Tickets
   ↓
Open Ticket
   ↓
Another user cannot access it
```

## Feature Roadmap

1. Authentication
2. Ticket CRUD
3. Authorization and ownership
4. Admin functionality
5. Comments
6. Search and filters
7. Pagination
8. Admin dashboard
9. Testing and security
10. Deployment

## Development Method

For every feature:

```text
Discuss
   ↓
Understand
   ↓
Plan the flow
   ↓
Implement
   ↓
Test
   ↓
Debug
   ↓
Review
```

The goal is not only:

> "My Helpdesk works."

The goal is:

> **"I understand my Helpdesk from the browser all the way to MongoDB."**


## Security Requirements

- Hash passwords
- Protect authenticated routes
- Enforce authorization in backend
- Protect admin functionality
- Do not trust user IDs from frontend
- Do not expose secrets
- Do not commit `.env` to GitHub

## Required Screens

- Register
- Login
- User dashboard
- Create ticket
- Ticket details
- Admin dashboard

## Current Progress

Update this checklist as the project develops.

```text
[✅] User model
[✅] Ticket model
[ ] Comment model

[✅] Register
[✅] Login
[ ] Logout
[ ] Access token
[ ] Refresh token

[✅] Create ticket
[ ] My tickets
[ ] Ticket details
[ ] Update ticket
[ ] Delete ticket

[ ] Authentication middleware
[ ] Authorization middleware
[ ] Ticket ownership authorization

[ ] Admin permissions
[ ] Change status
[ ] Change priority
[ ] Assignment

[ ] Comments
[ ] Search
[ ] Filters
[ ] Pagination
[ ] Admin dashboard

[ ] Testing
[ ] Security review
[ ] Deployment
```
