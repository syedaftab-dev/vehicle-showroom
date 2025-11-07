import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';

import { config } from '../config/env.js';

import { createUser, findUserByEmail } from '../repositories/userRepo.js';

import { findEmployeeIdByUserId } from '../repositories/employeeRepo.js';

export async function registerUser({ name, email, password, role }) {

  const existing = await findUserByEmail(email);

  if (existing) return { error: 'Email already exists' };

  const passwordHash = await bcrypt.hash(password, 10);

  const { id } = await createUser({ name, email, passwordHash, role });

  const token = jwt.sign({ id, name, email, role }, config.jwtSecret, { expiresIn: '7d' });

  return { id, name, email, role, token };

}

export async function loginUser({ email, password }) {

  const user = await findUserByEmail(email);

  if (!user) return { error: 'Invalid credentials' };

  const ok = await bcrypt.compare(password, user.PASSWORD_HASH || user.password_hash);

  if (!ok) return { error: 'Invalid credentials' };

  const uid = user.ID || user.id;

  const empId = await findEmployeeIdByUserId(uid);

  const payload = { id: uid, name: user.NAME || user.name, email: user.EMAIL || user.email, role: user.ROLE || user.role, employeeId: empId };

  const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '7d' });

  return { ...payload, token };

}

