# Event Booking System

A full-stack web application for booking event tickets, built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features

- User authentication and authorization
- Browse and search events/tickets
- Book tickets with real-time availability
- User dashboard for managing bookings
- Responsive design for mobile and desktop

## Tech Stack

### Frontend
- React.js
- React Router for navigation
- Tailwind CSS for styling
- Axios for API requests
- Context API for state management

### Backend
- Node.js & Express.js
- MongoDB with Mongoose
- JWT for authentication
- Socket.IO for real-time updates

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
\`\`\`bash
git clone https://github.com/yourusername/event-booking-system.git
cd event-booking-system
\`\`\`

2. Install backend dependencies
\`\`\`bash
cd backend
npm install
\`\`\`

3. Install frontend dependencies
\`\`\`bash
cd frontend
npm install
\`\`\`

4. Create a .env file in the backend directory with the following variables:
\`\`\`
MONGODB_URI=mongodb://localhost:27017/event_booking
PORT=5000
JWT_SECRET=your_jwt_secret_key
\`\`\`

### Running the Application

1. Start the backend server
\`\`\`bash
cd backend
npm start
\`\`\`

2. Start the frontend development server
\`\`\`bash
cd frontend
npm start
\`\`\`

3. Seed the database with sample data (optional)
\`\`\`bash
cd backend
node scripts/seedTickets.js
\`\`\`

The application will be available at http://localhost:3000

## Project Structure

\`\`\`
event-booking-system/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── scripts/
│   └── server.js
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── context/
│       ├── services/
│       └── utils/
└── README.md
\`\`\`

## Contributing

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 