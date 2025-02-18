# Reddit

A brief description of the project.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js with Express.js
- **Database**: MongoDB

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (https://nodejs.org/)
- MongoDB (https://www.mongodb.com/)
- npm or yarn

### Installation

#### Clone the Repository
```sh
git clone project-url
cd your-repo
```

#### Backend Setup
```sh
cd backend
npm install  # Install dependencies
npm start  # Start the backend server
```

#### Frontend Setup
```sh
cd frontend
npm install  # Install dependencies
npm start  # Start the React development server
```

### User Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### CRUD Operations
- `GET /api/items` - Fetch all items
- `POST /api/items` - Create a new item
- `PUT /api/items/:id` - Update an item
- `DELETE /api/items/:id` - Delete an item

