# Vehicle Showroom Management System - Backend

## Tech Stack
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing

## Prerequisites
- Node.js (v16+)
- MongoDB (running on localhost:27017)

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file in the root directory:

```env
MONGODB_URI=mongodb://localhost:27017/vehicle_showroom
JWT_SECRET=your_secret_key_here
PORT=4000
NODE_ENV=development
```

## Running the Server

**Development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Vehicles
- `GET /api/vehicles` - List all vehicles
- `POST /api/vehicles` - Create vehicle
- `PUT /api/vehicles/:id` - Update vehicle
- `DELETE /api/vehicles/:id` - Delete vehicle

### Customers
- `GET /api/customers` - List all customers
- `POST /api/customers` - Create customer
- `PUT /api/customers/:id` - Update customer
- `DELETE /api/customers/:id` - Delete customer

### Employees
- `GET /api/employees` - List all employees
- `POST /api/employees` - Create employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee

### Sales
- `GET /api/sales` - List all sales
- `POST /api/sales` - Record new sale

### Targets
- `GET /api/targets` - List all targets
- `POST /api/targets` - Create target
- `PUT /api/targets/:id` - Update target
- `DELETE /api/targets/:id` - Delete target

### Salary
- `GET /api/salary` - List salary records
- `POST /api/salary` - Create/Update salary

### Reports
- `GET /api/reports/boss` - Boss dashboard
- `GET /api/reports/manager` - Manager dashboard
- `GET /api/reports/employee` - Employee dashboard

## Database Models

- **User** - User authentication and roles
- **Employee** - Employee details
- **Vehicle** - Vehicle inventory
- **Customer** - Customer information
- **Sale** - Sales transactions
- **Target** - Employee sales targets
- **Salary** - Salary management

## Project Structure

```
server/
├── src/
│   ├── config/         # Configuration files
│   ├── controllers/    # Route controllers
│   ├── db/            # Database connection
│   ├── middleware/     # Express middlewares
│   ├── models/        # Mongoose models
│   ├── repositories/  # Data access layer
│   ├── routes/        # API routes
│   ├── services/      # Business logic
│   ├── utils/         # Utility functions
│   ├── app.js         # Express app setup
│   └── server.js      # Server entry point
├── .env               # Environment variables
├── package.json       # Dependencies
└── README.md          # This file
```

## Notes

- Make sure MongoDB is running before starting the server
- Default port is 4000
- The API uses JWT tokens for authentication
- Password hashing is done using bcryptjs
