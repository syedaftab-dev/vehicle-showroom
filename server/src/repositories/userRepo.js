import { User } from '../models/User.js';

export async function createUser({ name, email, passwordHash, role }) {

  const user = await User.create({ name, email, passwordHash, role });

  return { id: user._id };

}

export async function findUserByEmail(email) {

  const user = await User.findOne({ email: email.toLowerCase() }).lean();

  if (!user) return null;

  return {

    ID: user._id,
    NAME: user.name,
    EMAIL: user.email,
    PASSWORD_HASH: user.passwordHash,
    ROLE: user.role
  };

}

