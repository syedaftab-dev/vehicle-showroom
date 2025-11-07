import express from 'express';

import cors from 'cors';

import morgan from 'morgan';

import { connectDB } from './db/pool.js';

import './models/index.js';

import { errorHandler } from './middleware/errorHandler.js';

import authRoutes from './routes/authRoutes.js';

import vehicleRoutes from './routes/vehicleRoutes.js';

import customerRoutes from './routes/customerRoutes.js';

import employeeRoutes from './routes/employeeRoutes.js';

import salesRoutes from './routes/salesRoutes.js';

import targetRoutes from './routes/targetRoutes.js';

import salaryRoutes from './routes/salaryRoutes.js';

const app = express();

// Configure CORS
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Health check endpoint
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Vehicle Showroom API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      vehicles: '/api/vehicles',
      customers: '/api/customers',
      employees: '/api/employees',
      sales: '/api/sales',
      targets: '/api/targets',
      salary: '/api/salary'
    }
  });
});

app.use('/api/auth', authRoutes);

app.use('/api/vehicles', vehicleRoutes);

app.use('/api/customers', customerRoutes);

app.use('/api/employees', employeeRoutes);

app.use('/api/sales', salesRoutes);

app.use('/api/targets', targetRoutes);

app.use('/api/salary', salaryRoutes);

app.use(errorHandler);

export async function createApp() {
  await connectDB();
  return app;
}

export default app;
