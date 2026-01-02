# Contact Management Web App

A full-stack MERN (MongoDB, Express.js, React.js, Node.js) application for managing contacts with a beautiful, responsive UI built with Tailwind CSS.

## Features

- ✅ Contact form with validation (Name, Email, Phone, Message)
- ✅ Client-side validation with error messages
- ✅ Real-time contact list display (no page reload)
- ✅ Responsive design (mobile and desktop)
- ✅ Clean, modern UI with Tailwind CSS
- ✅ Submit button disabled when form is invalid
- ✅ RESTful API endpoints (GET, POST)

## Tech Stack

- **Frontend**: React.js, Tailwind CSS, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **State Management**: React useState

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (free tier available)
- npm or yarn

## Installation & Setup

### 1. MongoDB Atlas Setup

1. **Create a MongoDB Atlas Account** (if you don't have one):
   - Go to [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for a free account

2. **Create a Cluster**:
   - Click "Build a Database"
   - Choose the FREE (M0) tier
   - Select a cloud provider and region
   - Click "Create"

3. **Create a Database User**:
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Create a username and password (save these!)
   - Set user privileges to "Atlas admin" or "Read and write to any database"
   - Click "Add User"

4. **Configure Network Access**:
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development) or add your specific IP
   - Click "Confirm"

5. **Get Your Connection String**:
   - Go to "Database" in the left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (it looks like: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`)
   - Replace `<username>` and `<password>` with your database user credentials
   - Add your database name at the end: `/contactmanagement`

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGODB_URI=mongodb+srv://yourusername:yourpassword@cluster0.xxxxx.mongodb.net/contactmanagement?retryWrites=true&w=majority
```

**Important**: Replace:
- `yourusername` with your MongoDB Atlas database username
- `yourpassword` with your MongoDB Atlas database password
- `cluster0.xxxxx` with your actual cluster address

Start the backend server:
```bash
npm start
# or for development with auto-reload
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory (optional, defaults to localhost:5000):

```env
REACT_APP_API_URL=http://localhost:5000/api/contacts
```

Start the frontend development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## Project Structure

```
assignmentdedio/
├── backend/
│   ├── models/
│   │   └── Contact.js          # MongoDB schema
│   ├── routes/
│   │   └── contacts.js         # API routes
│   ├── server.js               # Express server
│   ├── package.json
│   └── .env                    # Environment variables
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── ContactForm.js  # Contact form component
│   │   │   └── ContactList.js  # Contact list component
│   │   ├── App.js              # Main app component
│   │   ├── index.js            # React entry point
│   │   └── index.css           # Tailwind CSS imports
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
└── README.md
```

## API Endpoints

### GET /api/contacts
Fetch all contacts
- **Response**: Array of contact objects

### POST /api/contacts
Create a new contact
- **Body**: 
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "message": "Optional message"
  }
  ```
- **Response**: Created contact object

## Contact Schema

```javascript
{
  name: String (required),
  email: String (required, validated),
  phone: String (required),
  message: String (optional),
  createdAt: Date,
  updatedAt: Date
}
```

## Validation Rules

- **Name**: Required, cannot be empty
- **Email**: Required, must be valid email format
- **Phone**: Required, cannot be empty
- **Message**: Optional

## Usage

1. Set up MongoDB Atlas (see step 1 above)
2. Configure your `.env` file with your Atlas connection string
3. Start the backend server:
   ```bash
   cd backend
   npm start
   ```
4. Start the frontend server (in a new terminal):
   ```bash
   cd frontend
   npm start
   ```
5. Open `http://localhost:3000` in your browser
6. Fill out the contact form and submit
7. View contacts in the list on the right (desktop) or below (mobile)

**Note**: Make sure your MongoDB Atlas connection string in the `.env` file is correct. The backend will log "MongoDB Connected" when successfully connected.

## Development

- Backend uses nodemon for auto-reload during development
- Frontend uses React's hot-reload feature
- CORS is enabled for frontend-backend communication

## License

ISC

