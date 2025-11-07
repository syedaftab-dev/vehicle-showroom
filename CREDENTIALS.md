# 🔐 Vehicle Showroom - Login Credentials

## Manager Credentials

**Email:** `manager@showroom.com`  
**Password:** `password123`  
**Name:** Priya Sharma  
**Role:** Manager  
**Phone:** 9876543210  
**Salary:** ₹80,000 + ₹15,000 bonus

---

## All User Accounts

### 👔 Boss Account
- **Email:** boss@showroom.com
- **Password:** password123
- **Name:** Rajesh Kumar
- **Role:** Boss

### 🎯 Manager Account
- **Email:** manager@showroom.com
- **Password:** password123
- **Name:** Priya Sharma
- **Role:** Manager

### 👨‍💼 Employee Accounts

1. **Amit Patel**
   - Email: amit@showroom.com
   - Password: password123
   - Phone: 9876543211
   - Salary: ₹45,000 + ₹8,000 bonus

2. **Sneha Gupta**
   - Email: sneha@showroom.com
   - Password: password123
   - Phone: 9876543212
   - Salary: ₹42,000 + ₹10,000 bonus

3. **Rahul Verma**
   - Email: rahul@showroom.com
   - Password: password123
   - Phone: 9876543213
   - Salary: ₹40,000 + ₹5,000 bonus

---

## Database Summary

### 📊 Seeded Data:

- **Users:** 5 (1 Boss, 1 Manager, 3 Employees)
- **Employees:** 4 employee records
- **Vehicles:** 8 vehicles (6 Available, 1 Reserved, 2 Sold)
- **Customers:** 5 customers
- **Sales:** 2 completed sales
- **Targets:** 4 quarterly targets (Q1 2024)
- **Salary Records:** 4 salary entries

### 🚗 Sample Vehicles:

1. Maruti Suzuki Swift - ₹6,50,000 (Available)
2. Hyundai Creta - ₹12,00,000 (Available)
3. Tata Nexon Electric - ₹9,50,000 (Available)
4. Mahindra Thar - ₹15,00,000 (Sold)
5. Honda City - ₹11,00,000 (Available)
6. Kia Seltos - ₹13,50,000 (Reserved)
7. Toyota Fortuner - ₹35,00,000 (Sold)
8. Maruti Brezza - ₹9,00,000 (Available)

### 👥 Sample Customers:

1. Arjun Singh - Interested in Hyundai Creta
2. Deepika Reddy - Purchased Mahindra Thar
3. Vikram Malhotra - Purchased Toyota Fortuner
4. Ananya Iyer - Interested in Tata Nexon
5. Rohan Kapoor - Interested in Kia Seltos

### 💰 Sales History:

1. **Sale 1**
   - Vehicle: Mahindra Thar
   - Customer: Deepika Reddy
   - Employee: Amit Patel
   - Amount: ₹15,00,000
   - Date: Feb 10, 2024
   - Payment: Finance

2. **Sale 2**
   - Vehicle: Toyota Fortuner
   - Customer: Vikram Malhotra
   - Employee: Sneha Gupta
   - Amount: ₹35,00,000
   - Date: Feb 20, 2024
   - Payment: Cash

---

## 🔄 Re-seeding Database

To reset and re-seed the database with fresh data:

```bash
cd server
npm run seed
```

This will:
- Clear all existing data
- Create fresh dummy data
- Display credentials in the terminal

---

## 🌐 Access URLs

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:4000
- **Health Check:** http://localhost:4000/health

---

**Note:** All passwords are set to `password123` for testing purposes.
