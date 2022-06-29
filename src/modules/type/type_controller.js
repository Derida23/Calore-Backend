import { validationResult } from 'express-validator';
import ResponseHelper from '../../helpers/response_helper';
import { findUserById } from '../user/user_repository';
import { createType, findListType, findTypeById, updateType } from './type_repository';

const get = async (req, res) => {
  try {
    const search = req.query.search || '';
    const status = req.query.status || '';
    let page = parseInt(req.query.page || '1');
    let limit = parseInt(req.query.limit || '10');

    let requirement = {};
    if (search) requirement.search = search;
    if (status) requirement.status = status;

    let type = await findListType(requirement, page, limit);

    const meta = {
      limit: limit,
      page: page,
      total_page: Math.ceil(type.count / limit),
      total_data: type.count,
    };

    return ResponseHelper(res, 200, 'success get list data type', type.rows, meta);
  } catch (error) {
    console.error(error);
    return ResponseHelper(res, 500, 'failed get type', error.message);
  }
};

const add = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return ResponseHelper(res, 422, 'Validation Error', errors.array());
  }

  try {
    const { user_id } = req.app.locals;

    // Check role admin
    let user = await findUserById(user_id);

    if (Number(user.role) !== 1) {
      return ResponseHelper(res, 401, 'not allowed to access', [
        { message: 'not allowed to access', param: 'id' },
      ]);
    }

    const type = await createType({ ...req.body });
    return ResponseHelper(res, 201, 'success create new type', type);
  } catch (error) {
    console.error(error);
    return ResponseHelper(res, 500, 'failed create new type', error.message);
  }
};

const update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return ResponseHelper(res, 422, 'Validation Error', errors.array());
  }

  try {
    const { id } = req.params;
    const { user_id } = req.app.locals;

    // Check type is exist
    let checkType = await findTypeById(id);
    if (!checkType) {
      return ResponseHelper(res, 409, 'type is not exist', [
        { message: 'type is not exist', param: 'id' },
      ]);
    }

    // Check role admin
    let user = await findUserById(user_id);

    if (Number(user.role) !== 1) {
      return ResponseHelper(res, 401, 'not allowed to access', [
        { message: 'not allowed to access', param: 'id' },
      ]);
    }

    // Update type
    await updateType({ ...req.body }, { where: { id } });

    const result = await findTypeById(id);

    return ResponseHelper(res, 201, 'success updated selected type', result);
  } catch (error) {
    console.error(error);
    return ResponseHelper(res, 500, 'failed updated selected type', error.message);
  }
};

export { get, add, update };
