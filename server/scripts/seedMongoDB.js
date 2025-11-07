import mongoose from 'mongoose';
// mongoose import karta hai.
import bcrypt from 'bcryptjs';
//password hashing ke liye bcrypt import karta hai.
import dotenv from 'dotenv';
// environment variables ke liye dotenv import karta hai.

import { User } from '../src/models/User.js';
import { Employee } from '../src/models/Employee.js';
import { Vehicle } from '../src/models/Vehicle.js';
import { Customer } from '../src/models/Customer.js';
import { Sale } from '../src/models/Sale.js';
import { Target } from '../src/models/Target.js';
import { Salary } from '../src/models/Salary.js';

dotenv.config();
// .env file load karta hai.

async function seed() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/vehicle_showroom');
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Employee.deleteMany({});
    await Vehicle.deleteMany({});
    await Customer.deleteMany({});
    await Sale.deleteMany({});
    await Target.deleteMany({});
    await Salary.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create Users with hashed passwords
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    const boss = await User.create({
      name: 'Rajesh Kumar',
      email: 'boss@showroom.com',
      passwordHash: hashedPassword,
      role: 'Boss'
    });

    const manager = await User.create({
      name: 'Priya Sharma',
      email: 'manager@showroom.com',
      passwordHash: hashedPassword,
      role: 'Manager'
    });

    const emp1User = await User.create({
      name: 'Amit Patel',
      email: 'amit@showroom.com',
      passwordHash: hashedPassword,
      role: 'Employee'
    });

    const emp2User = await User.create({
      name: 'Sneha Gupta',
      email: 'sneha@showroom.com',
      passwordHash: hashedPassword,
      role: 'Employee'
    });

    const emp3User = await User.create({
      name: 'Rahul Verma',
      email: 'rahul@showroom.com',
      passwordHash: hashedPassword,
      role: 'Employee'
    });

    console.log('✅ Created 5 users (1 Boss, 1 Manager, 3 Employees)');

    // Create Employees
    const managerEmp = await Employee.create({
      userId: manager._id,
      phone: '9876543210',
      address: '123 MG Road, Mumbai',
      salary: 80000,
      joiningDate: new Date('2023-01-15')
    });

    const emp1 = await Employee.create({
      userId: emp1User._id,
      phone: '9876543211',
      address: '456 Park Street, Delhi',
      salary: 45000,
      joiningDate: new Date('2023-03-20')
    });

    const emp2 = await Employee.create({
      userId: emp2User._id,
      phone: '9876543212',
      address: '789 Lake View, Bangalore',
      salary: 42000,
      joiningDate: new Date('2023-05-10')
    });

    const emp3 = await Employee.create({
      userId: emp3User._id,
      phone: '9876543213',
      address: '321 Civil Lines, Pune',
      salary: 40000,
      joiningDate: new Date('2023-06-01')
    });

    console.log('✅ Created 4 employees');

    // Add more users
    const additionalUsers = [
      {
        name: 'Neha Desai',
        email: 'neha@showroom.com',
        passwordHash: hashedPassword,
        role: 'Employee'
      },
      {
        name: 'Vikram Singh',
        email: 'vikram@showroom.com',
        passwordHash: hashedPassword,
        role: 'Employee'
      },
      {
        name: 'Priyanka Iyer',
        email: 'priyanka@showroom.com',
        passwordHash: hashedPassword,
        role: 'Employee'
      },
      {
        name: 'Rohan Malhotra',
        email: 'rohan@showroom.com',
        passwordHash: hashedPassword,
        role: 'Employee'
      }
    ];

    const createdUsers = await User.insertMany(additionalUsers);
    console.log(`✅ Created ${createdUsers.length} additional users`);

    // Add corresponding employee records
    const additionalEmployees = [
      {
        userId: createdUsers[0]._id,
        phone: '9876543214',
        address: '101 Palm Avenue, Chennai',
        salary: 48000,
        joiningDate: new Date('2023-04-15')
      },
      {
        userId: createdUsers[1]._id,
        phone: '9876543215',
        address: '202 Hill Road, Hyderabad',
        salary: 52000,
        joiningDate: new Date('2023-02-10')
      },
      {
        userId: createdUsers[2]._id,
        phone: '9876543216',
        address: '303 Lake View, Kolkata',
        salary: 46000,
        joiningDate: new Date('2023-07-22')
      },
      {
        userId: createdUsers[3]._id,
        phone: '9876543217',
        address: '404 Skyline, Pune',
        salary: 49000,
        joiningDate: new Date('2023-08-05')
      }
    ];

    const createdEmployees = await Employee.insertMany(additionalEmployees);
    console.log(`✅ Created ${createdEmployees.length} additional employees`);

    // Create Vehicles
    const vehicles = await Vehicle.insertMany([
      {
        brand: 'Maruti Suzuki',
        model: 'Swift',
        price: 650000,
        fuelType: 'Petrol',
        transmission: 'Manual',
        engineCc: 1197,
        mileage: 23,
        features: 'ABS, Airbags, AC, Power Steering',
        color: 'Red',
        manufacturingYear: 2024,
        imageUrl: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888',
        status: 'Available',
        checkInDate: new Date('2024-01-10')
      },
      {
        brand: 'Hyundai',
        model: 'Creta',
        price: 1200000,
        fuelType: 'Diesel',
        transmission: 'Automatic',
        engineCc: 1493,
        mileage: 18,
        features: 'Sunroof, Leather Seats, Navigation, Cruise Control',
        color: 'White',
        manufacturingYear: 2024,
        imageUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2',
        status: 'Available',
        checkInDate: new Date('2024-01-15')
      },
      {
        brand: 'Tata',
        model: 'Nexon',
        price: 950000,
        fuelType: 'Electric',
        transmission: 'Automatic',
        engineCc: 0,
        mileage: 312,
        features: 'Connected Car, Fast Charging, Digital Cluster',
        color: 'Blue',
        manufacturingYear: 2024,
        imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d',
        status: 'Available',
        checkInDate: new Date('2024-01-20')
      },
      {
        brand: 'Mahindra',
        model: 'Thar',
        price: 1500000,
        fuelType: 'Diesel',
        transmission: 'Manual',
        engineCc: 2184,
        mileage: 15,
        features: '4WD, Convertible Top, Off-road Ready',
        color: 'Black',
        manufacturingYear: 2024,
        imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf',
        status: 'Sold',
        checkInDate: new Date('2024-01-05'),
        checkOutDate: new Date('2024-02-10')
      },
      {
        brand: 'Honda',
        model: 'City',
        price: 1100000,
        fuelType: 'Petrol',
        transmission: 'CVT',
        engineCc: 1498,
        mileage: 18,
        features: 'Lane Watch, Paddle Shifters, Sunroof',
        color: 'Silver',
        manufacturingYear: 2024,
        imageUrl: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2',
        status: 'Available',
        checkInDate: new Date('2024-02-01')
      },
      {
        brand: 'Kia',
        model: 'Seltos',
        price: 1350000,
        fuelType: 'Petrol',
        transmission: 'Automatic',
        engineCc: 1497,
        mileage: 16,
        features: '360 Camera, Ventilated Seats, Wireless Charging',
        color: 'Grey',
        manufacturingYear: 2024,
        imageUrl: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738',
        status: 'Reserved',
        checkInDate: new Date('2024-02-05')
      },
      {
        brand: 'Toyota',
        model: 'Fortuner',
        price: 3500000,
        fuelType: 'Diesel',
        transmission: 'Automatic',
        engineCc: 2755,
        mileage: 14,
        features: '4WD, 7 Seater, Premium Sound System',
        color: 'White Pearl',
        manufacturingYear: 2024,
        imageUrl: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b',
        status: 'Sold',
        checkInDate: new Date('2024-01-25'),
        checkOutDate: new Date('2024-02-20')
      },
      {
        brand: 'Maruti Suzuki',
        model: 'Brezza',
        price: 900000,
        fuelType: 'Petrol',
        transmission: 'Manual',
        engineCc: 1462,
        mileage: 19,
        features: 'LED Projector Headlamps, Cruise Control',
        color: 'Orange',
        manufacturingYear: 2024,
        imageUrl: 'https://images.unsplash.com/photo-1610768764270-790fbec18178',
        status: 'Available',
        checkInDate: new Date('2024-02-10')
      }
    ]);

    console.log('✅ Created 8 vehicles');

    // Create Customers
    const customers = await Customer.insertMany([
      {
        name: 'Arjun Singh',
        phone: '9988776655',
        email: 'arjun.singh@email.com',
        address: 'Sector 15, Noida',
        vehicleOfInterest: 'Hyundai Creta',
        status: 'Contacted'
      },
      {
        name: 'Deepika Reddy',
        phone: '9988776656',
        email: 'deepika.r@email.com',
        address: 'Jubilee Hills, Hyderabad',
        vehicleOfInterest: 'Mahindra Thar',
        status: 'Converted'
      },
      {
        name: 'Vikram Malhotra',
        phone: '9988776657',
        email: 'vikram.m@email.com',
        address: 'Bandra West, Mumbai',
        vehicleOfInterest: 'Toyota Fortuner',
        status: 'Converted'
      },
      {
        name: 'Ananya Iyer',
        phone: '9988776658',
        email: 'ananya.iyer@email.com',
        address: 'Koramangala, Bangalore',
        vehicleOfInterest: 'Tata Nexon',
        status: 'Pending'
      },
      {
        name: 'Rohan Kapoor',
        phone: '9988776659',
        email: 'rohan.k@email.com',
        address: 'Salt Lake, Kolkata',
        vehicleOfInterest: 'Kia Seltos',
        status: 'Contacted'
      }
    ]);

    console.log('✅ Created 5 customers');

    // Create Sales (for sold vehicles)
    const soldVehicle1 = vehicles.find(v => v.model === 'Thar');
    const soldVehicle2 = vehicles.find(v => v.model === 'Fortuner');
    
    const sale1 = await Sale.create({
      vehicleId: soldVehicle1._id,
      employeeId: emp1._id,
      customerId: customers[1]._id,
      saleDate: new Date('2024-02-10'),
      revenue: 1500000,
      paymentMode: 'Finance'
    });

    const sale2 = await Sale.create({
      vehicleId: soldVehicle2._id,
      employeeId: emp2._id,
      customerId: customers[2]._id,
      saleDate: new Date('2024-02-20'),
      revenue: 3500000,
      paymentMode: 'Cash'
    });

    console.log('✅ Created 2 sales');

    // Create Targets
    await Target.insertMany([
      {
        employeeId: managerEmp._id,
        period: '2024-Q1',
        targetCount: 10,
        achievedCount: 0,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-03-31'),
        status: 'Active'
      },
      {
        employeeId: emp1._id,
        period: '2024-Q1',
        targetCount: 8,
        achievedCount: 1,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-03-31'),
        status: 'Active'
      },
      {
        employeeId: emp2._id,
        period: '2024-Q1',
        targetCount: 8,
        achievedCount: 1,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-03-31'),
        status: 'Active'
      },
      {
        employeeId: emp3._id,
        period: '2024-Q1',
        targetCount: 6,
        achievedCount: 0,
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-03-31'),
        status: 'Active'
      }
    ]);

    console.log('✅ Created 4 targets');

    // Create Salary records
    await Salary.insertMany([
      {
        employeeId: managerEmp._id,
        baseSalary: 80000,
        bonus: 15000
      },
      {
        employeeId: emp1._id,
        baseSalary: 45000,
        bonus: 8000
      },
      {
        employeeId: emp2._id,
        baseSalary: 42000,
        bonus: 10000
      },
      {
        employeeId: emp3._id,
        baseSalary: 40000,
        bonus: 5000
      }
    ]);

    console.log('✅ Created 4 salary records');

    console.log('\n🎉 Database seeded successfully!\n');
    console.log('═══════════════════════════════════════════');
    console.log('📋 LOGIN CREDENTIALS:');
    console.log('═══════════════════════════════════════════');
    console.log('\n👔 BOSS:');
    console.log('   Email: boss@showroom.com');
    console.log('   Password: password123');
    console.log('\n🎯 MANAGER:');
    console.log('   Email: manager@showroom.com');
    console.log('   Password: password123');
    console.log('\n👨‍💼 EMPLOYEES:');
    console.log('   1. amit@showroom.com / password123');
    console.log('   2. sneha@showroom.com / password123');
    console.log('   3. rahul@showroom.com / password123');
    console.log('═══════════════════════════════════════════\n');

    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seed();
