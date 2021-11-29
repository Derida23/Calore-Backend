import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/env';

const expired_token = 86400 * 1; // 1 day

const generatePassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const password_hash = await bcrypt.hash(password, salt);
  return password_hash;
};

const generateToken = (user_id) => {
  const token = jwt.sign({ user_id }, jwtSecret, { expiresIn: expired_token });
  return token;
};

const generateRefreshToken = async () => {
  const token = uuidv4();
  const expiry = new Date(Date.now() + this.expiresRefreshToken);
  const salt = await bcrypt.genSalt(10);
  const token_hash = await bcrypt.hash(token, salt);

  return { hash: token_hash, expiry };
};

const getToken = (token) => {
  const Authorization = token;
  if (Authorization) {
    return Authorization.replace('Bearer ', '');
  }

  throw new Error('not authorization');
};

const getUserId = (token) => {
  if (token) {
    const result = jwt.verify(token, jwtSecret);
    return result.user_id;
  }
};

const comparePassword = async (password, compare_password) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, compare_password, function (error, is_match) {
      if (error) reject(error);
      resolve(is_match);
    });
  });
};

export {
  generatePassword,
  generateToken,
  generateRefreshToken,
  getToken,
  getUserId,
  comparePassword,
};
