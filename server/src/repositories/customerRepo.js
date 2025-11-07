import { Customer } from '../models/Customer.js';

export async function listCustomers({ offset, limit, search }) {

  const query = search ? {
    $or: [
      { name: { $regex: search, $options: 'i' } },
      { phone: { $regex: search, $options: 'i' } }
    ]
  } : {};

  const total = await Customer.countDocuments(query);

  const customers = await Customer.find(query)
    .sort({ _id: -1 })
    .skip(offset)
    .limit(limit)
    .lean();

  const rows = customers.map(c => ({
    ID: c._id,
    NAME: c.name,
    PHONE: c.phone,
    EMAIL: c.email,
    ADDRESS: c.address,
    VEHICLE_OF_INTEREST: c.vehicleOfInterest,
    STATUS: c.status,
    RN: null
  }));

  return { rows, total };

}

export async function createCustomer(data) {

  await Customer.create({
    name: data.name,
    phone: data.phone,
    email: data.email,
    address: data.address,
    vehicleOfInterest: data.vehicle_of_interest,
    status: data.status
  });

  return { ok: true };

}

export async function updateCustomer(id, data) {

  await Customer.findByIdAndUpdate(id, {
    name: data.name,
    phone: data.phone,
    email: data.email,
    address: data.address,
    vehicleOfInterest: data.vehicle_of_interest,
    status: data.status
  });

  return { ok: true };

}

export async function deleteCustomer(id) {

  await Customer.findByIdAndDelete(id);

  return { ok: true };

}

