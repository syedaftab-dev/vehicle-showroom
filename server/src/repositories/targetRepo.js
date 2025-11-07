import { Target } from '../models/Target.js';

export async function listTargets({ offset, limit, employee_id }) {

  const query = employee_id ? { employeeId: employee_id } : {};

  const total = await Target.countDocuments(query);

  const targets = await Target.find(query)
    .sort({ _id: -1 })
    .skip(offset)
    .limit(limit)
    .lean();

  const rows = targets.map(t => ({
    ID: t._id,
    EMPLOYEE_ID: t.employeeId,
    PERIOD: t.period,
    TARGET_COUNT: t.targetCount,
    ACHIEVED_COUNT: t.achievedCount,
    START_DATE: t.startDate,
    END_DATE: t.endDate,
    STATUS: t.status,
    RN: null
  }));

  return { rows, total };

}

export async function createTarget(data) {

  await Target.create({
    employeeId: data.employee_id,
    period: data.period,
    targetCount: data.target_count,
    achievedCount: data.achieved_count || 0,
    startDate: data.start_date,
    endDate: data.end_date,
    status: data.status
  });

  return { ok: true };

}

export async function updateTarget(id, data) {

  await Target.findByIdAndUpdate(id, {
    employeeId: data.employee_id,
    period: data.period,
    targetCount: data.target_count,
    achievedCount: data.achieved_count,
    startDate: data.start_date,
    endDate: data.end_date,
    status: data.status
  });

  return { ok: true };

}

export async function deleteTarget(id) {

  await Target.findByIdAndDelete(id);

  return { ok: true };

}

