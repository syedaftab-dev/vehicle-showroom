import Joi from 'joi';

import { loginUser, registerUser } from '../services/authService.js';

export async function register(req, res) {

  const schema = Joi.object({ name: Joi.string().min(2).required(), email: Joi.string().email().required(), password: Joi.string().min(6).required(), role: Joi.string().valid('Boss','Manager','Employee').required() });

  const { error, value } = schema.validate(req.body);

  if (error) return res.status(400).json({ error: error.message });

  const result = await registerUser(value);

  if (result.error) return res.status(400).json({ error: result.error });

  return res.status(201).json(result);

}

export async function login(req, res) {

  const schema = Joi.object({ email: Joi.string().email().required(), password: Joi.string().required() });

  const { error, value } = schema.validate(req.body);

  if (error) return res.status(400).json({ error: error.message });

  const result = await loginUser(value);

  if (result.error) return res.status(401).json({ error: result.error });

  return res.status(200).json(result);

}

export async function me(req, res) {

  return res.json(req.user);

}

