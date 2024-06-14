import crypto from 'crypto';
import { User } from '~/types';

// Faked user DB
const users: Array<User> = [];

export const createUser = (): User => {
  const id = crypto.randomBytes(16).toString('hex');
  const user = { id };
  users.push(user);
  return user;
}