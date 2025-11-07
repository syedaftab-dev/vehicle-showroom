import { Salary } from '../models/Salary.js';

export async function listSalary({ offset, limit, employee_id }) {

  const query = employee_id ? { employeeId: employee_id } : {};

  const total = await Salary.countDocuments(query);

  const salaries = await Salary.find(query)
    .sort({ updatedAt: -1 })
    .skip(offset)
    .limit(limit)
    .lean();

  const rows = salaries.map(s => ({
    ID: s._id,
    EMPLOYEE_ID: s.employeeId,
    BASE_SALARY: s.baseSalary,
    BONUS: s.bonus,
    UPDATED_AT: s.updatedAt,
    RN: null
  }));

  return { rows, total };

}

export async function upsertSalary(data) {

  const existing = await Salary.findOne({ employeeId: data.employee_id });

  if (existing) {

    await Salary.findByIdAndUpdate(existing._id, {
      baseSalary: data.base_salary,
      bonus: data.bonus
    });

  } else {

    await Salary.create({
      employeeId: data.employee_id,
      baseSalary: data.base_salary,
      bonus: data.bonus
    });

  }

  return { ok: true };

}

