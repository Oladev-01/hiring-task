# Task Master Application Documentation

## Overview

The Task Master application is a task management tool that allows users to create, update, delete, and filter tasks. The application consists of a backend API and a frontend React application.

## Technologies

- **Language**: TypeScript
- **Framework**: Express.js, React.js
- **Database**: MySQL
- **Tools**: Font Awesome

---

## Backend API

### Base URL
http://localhost:8000/api/v1

1. Get All Todos
Endpoint: **/todos**
Method: GET
Headers:
Authorization: Bearer token
Description: Fetches all the todos for the authenticated user.
Example Request:
```
GET /api/v1/todos
Authorization: Bearer <token>```

- Example Response:
```
{
  "plans": [
    {
      "id": 1,
      "title": "Plan 1",
      "description": "Description 1",
      "dueDate": "2023-12-31T23:59:59Z",
      "status": false
    },
    {
      "id": 2,
      "title": "Plan 2",
      "description": "Description 2",
      "dueDate": "2023-12-31T23:59:59Z",
      "status": true
    }
  ]
}
```

- 2. Create a Todo
Endpoint: /todos
Method: POST
Headers:
Authorization: Bearer token
Content-Type: application/json

Body:
```
{
  "title": "New Plan",
  "description": "Description of the new plan",
  "status": false,
  "dueDate": "2023-12-31T23:59:59Z"
}
```
Description: Creates a new todo for the authenticated user.

Example Request:
```
POST /api/v1/todos
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "New Plan",
  "description": "Description of the new plan",
  "status": false,
  "dueDate": "2023-12-31T23:59:59Z"
}
```

Example Response:
```
{
  "id": 3,
  "title": "New Plan",
  "description": "Description of the new plan",
  "dueDate": "2023-12-31T23:59:59Z",
  "status": false
}
```

Update a Todo
Endpoint: /todos/{id}
Method: PUT
Headers:
Authorization: Bearer token
Content-Type: application/json

Body:
{
  "title": "Updated Plan",
  "description": "Updated description",
  "status": true,
  "dueDate": "2023-12-31T23:59:59Z"
}

Description: Updates an existing todo for the authenticated user.

Example Request:
```
PUT /api/v1/todos/3
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Plan",
  "description": "Updated description",
  "status": true,
  "dueDate": "2023-12-31T23:59:59Z"
}
```

Example Response:
```
{
  "id": 3,
  "title": "Updated Plan",
  "description": "Updated description",
  "dueDate": "2023-12-31T23:59:59Z",
  "status": true
}
```

Delete a Todo
Endpoint: /todos/{id}
Method: DELETE
Headers:
Authorization: Bearer token
Description: Deletes an existing todo for the authenticated user.

Example Request:
```
DELETE /api/v1/todos/3
Authorization: Bearer <token>
```

The Task Master application provides a comprehensive task management solution with a robust backend API and a user-friendly frontend interface. The backend API handles CRUD operations for todos, while the frontend React application integrates these APIs to provide a seamless user experience. The application is styled using CSS to ensure a visually appealing and responsive design.
