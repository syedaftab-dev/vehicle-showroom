import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 4000,
  env: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'dev_secret',
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/vehicle_showroom'
};
