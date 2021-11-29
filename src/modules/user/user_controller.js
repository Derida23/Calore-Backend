import { validationResult } from 'express-validator';
import ResponseHelper from '../../helpers/response_helper';
import { findUserById, updateUser } from './user_repository';

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

    const { user } = await findUserById(user_id);

    // Check user already exist in database or not
    if (!user) {
      return ResponseHelper(res, 404, 'user not found', [
        { message: 'user not found', param: 'id' },
      ]);
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

export { user, update };
