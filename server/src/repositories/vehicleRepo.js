import { Vehicle } from '../models/Vehicle.js';

export async function listVehicles({ offset, limit, filters }) {

  const query = {};

  if (filters.search) {

    query.$or = [
      { brand: { $regex: filters.search, $options: 'i' } },
      { model: { $regex: filters.search, $options: 'i' } }
    ];

  }
  if (filters.status) {

    query.status = filters.status;

  }
  const total = await Vehicle.countDocuments(query);

  const vehicles = await Vehicle.find(query)
    .sort({ _id: -1 })
    .skip(offset)
    .limit(limit)
    .lean();

  const rows = vehicles.map(v => ({
    ID: v._id,
    BRAND: v.brand,
    MODEL: v.model,
    PRICE: v.price,
    FUEL_TYPE: v.fuelType,
    TRANSMISSION: v.transmission,
    ENGINE_CC: v.engineCc,
    MILEAGE: v.mileage,
    FEATURES: v.features,
    COLOR: v.color,
    MANUFACTURING_YEAR: v.manufacturingYear,
    IMAGE_URL: v.imageUrl,
    STATUS: v.status,
    CHECK_IN_DATE: v.checkInDate,
    CHECK_OUT_DATE: v.checkOutDate
  }));

  return { rows, total };

}

export async function getVehicle(id) {

  const vehicle = await Vehicle.findById(id).lean();

  if (!vehicle) return null;

  return {
    ID: vehicle._id,
    BRAND: vehicle.brand,
    MODEL: vehicle.model,
    PRICE: vehicle.price,
    FUEL_TYPE: vehicle.fuelType,
    TRANSMISSION: vehicle.transmission,
    ENGINE_CC: vehicle.engineCc,
    MILEAGE: vehicle.mileage,
    FEATURES: vehicle.features,
    COLOR: vehicle.color,
    MANUFACTURING_YEAR: vehicle.manufacturingYear,
    IMAGE_URL: vehicle.imageUrl,
    STATUS: vehicle.status,
    CHECK_IN_DATE: vehicle.checkInDate,
    CHECK_OUT_DATE: vehicle.checkOutDate
  };

}

export async function createVehicle(data) {

  await Vehicle.create({
    brand: data.brand,
    model: data.model,
    price: data.price,
    fuelType: data.fuel_type,
    transmission: data.transmission,
    engineCc: data.engine_cc,
    mileage: data.mileage,
    features: data.features,
    color: data.color,
    manufacturingYear: data.manufacturing_year,
    imageUrl: data.image_url,
    status: data.status,
    checkInDate: data.check_in_date
  });

  return { ok: true };

}

export async function updateVehicle(id, data) {

  await Vehicle.findByIdAndUpdate(id, {
    brand: data.brand,
    model: data.model,
    price: data.price,
    fuelType: data.fuel_type,
    transmission: data.transmission,
    engineCc: data.engine_cc,
    mileage: data.mileage,
    features: data.features,
    color: data.color,
    manufacturingYear: data.manufacturing_year,
    imageUrl: data.image_url,
    status: data.status
  });

  return { ok: true };

}

export async function deleteVehicle(id) {

  await Vehicle.findByIdAndDelete(id);

  return { ok: true };

}

