import { validationResult } from 'express-validator';
import ResponseHelper from '../../helpers/response_helper';
import { findOneUser, findUserById, updateUser } from './user_repository';

// Get Detail User
const user = async (req, res) => {
  try {
    const { user_id } = req.app.locals;
    const user = await findUserById(user_id);

    if (!user) {
      return ResponseHelper(res, 404, 'user not found', [
        { message: 'user not found', param: 'id' },
      ]);
    }

    delete user.password;
    return ResponseHelper(res, 200, 'success get details user', user);
  } catch (error) {
    console.error(error);
    return ResponseHelper(res, 500, 'failed get details user', error.message);
  }
};

const update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return ResponseHelper(res, 442, 'validation error', errors.array());
  }

  try {
    const { user_id } = req.app.locals;
    const { name, status, phone, address, district_id, regencie_id, province_id } = req.body;

    const user = await findUserById(user_id);

    // Check user already exist in database or not
    if (!user) {
      return ResponseHelper(res, 404, 'user not found', [
        { message: 'user not found', param: 'id' },
      ]);
    }

    let check_phone = await findOneUser({
      where: { phone },
    });

    // Check phone registered
    if (check_phone) {
      if (user_id !== check_phone.id && check_phone.phone === phone) {
        return ResponseHelper(res, 409, 'phone has been used', [
          { message: 'phone has been used', param: 'phone' },
        ]);
      }
    }

    // Can only update
    await updateUser(
      { name, status, phone, address, district_id, regencie_id, province_id },
      { where: { id: user_id } }
    );

    const result = await findUserById(user_id);

    delete result.password;

    return ResponseHelper(res, 201, 'success edit user', result);
  } catch (error) {
    console.error(error);
    return ResponseHelper(res, 500, 'failed edit user', error.message);
  }
};

const updateAdmin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return ResponseHelper(res, 442, 'validation error', errors.array());
  }

  try {
    const { name, status, phone, address, district_id, regencie_id, province_id } = req.body;
    const { id } = req.params;
    const { user_id } = req.app.locals;

    const user = await findUserById(id);
    const admin = await findUserById(user_id);

    if (!user) {
      return ResponseHelper(res, 404, 'user not found', [
        { message: 'user not found', param: 'id' },
      ]);
    }

    // Check only admin can update user
    if (admin.role !== 1) {
      return ResponseHelper(res, 401, 'not allowed to access', [
        { message: 'not allowed to access', param: 'id' },
      ]);
    }

    let check_phone = await findOneUser({
      where: { phone },
    });

    // Check phone registered
    if (check_phone) {
      if (Number(id) !== check_phone.id && check_phone.phone === phone) {
        return ResponseHelper(res, 409, 'phone has been used', [
          { message: 'phone has been used', param: 'phone' },
        ]);
      }
    }

    await updateUser(
      { name, status, phone, address, district_id, regencie_id, province_id },
      { where: { id: id } }
    );

    const result = await findUserById(id);

    delete result.password;

    return ResponseHelper(res, 201, 'success edit user', result);
  } catch (error) {
    console.error(error);
    return ResponseHelper(res, 500, 'failed edit user', error.message);
  }
};

export { user, update, updateAdmin };
