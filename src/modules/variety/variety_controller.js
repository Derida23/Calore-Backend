import { validationResult } from 'express-validator';
import ResponseHelper from '../../helpers/response_helper';
import { findUserById } from '../user/user_repository';
import {
  createVariety,
  findListVariety,
  findVarietyById,
  updateVariety,
} from './variety_repository';

const get = async (req, res) => {
  try {
    const search = req.query.search || '';
    const status = req.query.status || '';
    let page = parseInt(req.query.page || '1');
    let limit = parseInt(req.query.limit || '10');

    let requirement = {};
    if (search) requirement.search = search;
    if (status) requirement.status = status;

    let variety = await findListVariety(requirement, page, limit);

    const meta = {
      limit: limit,
      page: page,
      total_page: Math.ceil(variety.count / limit),
      total_data: variety.count,
    };

    return ResponseHelper(res, 200, 'success get list data variety', variety.rows, meta);
  } catch (error) {
    console.error(error);
    return ResponseHelper(res, 500, 'failed get variety', error.message);
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

    const variety = await createVariety({ ...req.body });
    return ResponseHelper(res, 201, 'success create new variety', variety);
  } catch (error) {
    console.error(error);
    return ResponseHelper(res, 500, 'failed create new variety', error.message);
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

    // Check variety is exist
    let checkType = await findVarietyById(id);
    if (!checkType) {
      return ResponseHelper(res, 409, 'variety is not exist', [
        { message: 'variety is not exist', param: 'id' },
      ]);
    }

    // Check role admin
    let user = await findUserById(user_id);

    if (Number(user.role) !== 1) {
      return ResponseHelper(res, 401, 'not allowed to access', [
        { message: 'not allowed to access', param: 'id' },
      ]);
    }

    // Update variety
    await updateVariety({ ...req.body }, { where: { id } });

    const result = await findVarietyById(id);

    return ResponseHelper(res, 201, 'success updated selected variety', result);
  } catch (error) {
    console.error(error);
    return ResponseHelper(res, 500, 'failed updated selected variety', error.message);
  }
};

export { get, add, update };
