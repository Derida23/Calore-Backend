import { validationResult } from 'express-validator';
import { generatePassword, generateToken, comparePassword } from '../../helpers/authentication';
import { createUser } from './auth_repository';
import { findOneUser, updateUser } from '../user/user_repository';
import ResponseHelper from '../../helpers/response_helper';
import bcrypt from 'bcryptjs';

// Register new user
const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return ResponseHelper(res, 422, 'validation error', errors.array());
  }

  try {
    const {
      email,
      password,
      confirm_password,
      name,
      role,
      phone,
      address,
      district_id,
      regencie_id,
      province_id,
    } = req.body;

    // Checking available user
    let check_email = await findOneUser({
      where: { email },
    });

    let check_phone = await findOneUser({
      where: { phone },
    });

    if (check_email) {
      return ResponseHelper(res, 409, 'email already registered', [
        { message: 'email already registered', param: 'email' },
      ]);
    }

    if (check_phone) {
      return ResponseHelper(res, 409, 'phone already registered', [
        { message: 'phone already registered', param: 'phone' },
      ]);
    }

    // Check Confirm Password
    if (password !== confirm_password) {
      return ResponseHelper(res, 422, 'confirm password not same', [
        { message: 'confirm password not same', param: 'password' },
      ]);
    }

    const password_hash = await generatePassword(password);
    const new_user = await createUser({
      email,
      password: password_hash,
      name,
      role,
      phone,
      address,
      district_id,
      regencie_id,
      province_id,
    });

    let user = await findOneUser({ where: { id: new_user.id } });

    const token = generateToken(user.id);

    await updateUser(
      { token: token, last_login: new Date(Date.now()) },
      { where: { id: new_user.id } }
    );

    delete user.password;

    return ResponseHelper(res, 200, `success register new user`, {
      token,
      user,
    });
  } catch (error) {
    console.error(error);
    return ResponseHelper(res, 500, 'failed register new user', error.message);
  }
};

// Login user
const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return ResponseHelper(res, 422, 'validation error', errors.array());
  }

  try {
    const { email, password } = req.body;

    let user = await findOneUser({ where: { email } });

    // Check Email
    if (!user) {
      return ResponseHelper(res, 422, 'email not exist in database', [
        { message: 'email not exist in database', param: 'email' },
      ]);
    }

    const isMatch = await comparePassword(password, user.password);
    const validPassword = await bcrypt.compare(password, user.password);

    // Check Password
    if (!isMatch) {
      return ResponseHelper(res, 422, 'wrong password', [
        { message: 'wrong password', param: 'password' },
      ]);
    }

    const token = generateToken(user.id);
    delete user.password;

    return ResponseHelper(res, 200, 'success login', { token, user });
  } catch (error) {
    console.error(error);
    return ResponseHelper(res, 500, 'failed login', error.message);
  }
};

export { register, login };
