import { Employee } from '../models/Employee.js';

import { User } from '../models/User.js';

export async function listEmployees({ offset, limit, search }) {

  let query = {};

  if (search) {

    const users = await User.find({
      $or: [
        { name: { $regex: search, $options: 'i' } }
      ]
    }).select('_id').lean();

    const userIds = users.map(u => u._id);

    query = {
      $or: [
        { userId: { $in: userIds } },
        { phone: { $regex: search, $options: 'i' } }
      ]
    };

  }
  const total = await Employee.countDocuments(query);

  const employees = await Employee.find(query)
    .populate('userId', 'name email')
    .sort({ _id: -1 })
    .skip(offset)
    .limit(limit)
    .lean();

  const rows = employees.map(e => ({
    ID: e._id,
    NAME: e.userId?.name || '',
    EMAIL: e.userId?.email || '',
    PHONE: e.phone,
    ADDRESS: e.address,
    SALARY: e.salary,
    JOINING_DATE: e.joiningDate
  }));

  return { rows, total };

}

export async function createEmployee(data) {

  await Employee.create({
    userId: data.user_id,
    phone: data.phone,
    address: data.address,
    salary: data.salary,
    joiningDate: data.joining_date
  });

  return { ok: true };

}

export async function updateEmployee(id, data) {

  await Employee.findByIdAndUpdate(id, {
    phone: data.phone,
    address: data.address,
    salary: data.salary,
    joiningDate: data.joining_date
  });

  return { ok: true };

}

export async function deleteEmployee(id) {

  await Employee.findByIdAndDelete(id);

  return { ok: true };

}

export async function findEmployeeIdByUserId(userId) {

  const employee = await Employee.findOne({ userId }).select('_id').lean();

  return employee ? employee._id : null;

}

