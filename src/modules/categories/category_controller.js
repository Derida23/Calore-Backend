import { validationResult } from 'express-validator';
import ResponseHelper from '../../helpers/response_helper';
import { findUserById } from '../user/user_repository';
import {
  createCategory,
  findListCategory,
  findCategoryById,
  updateCategory,
} from './category_repository';

const get = async (req, res) => {
  try {
    const { user_id } = req.app.locals;

    // Check role admin
    let user = await findUserById(user_id);
    if (Number(user.role) !== 1) {
      return ResponseHelper(res, 401, 'not allowed to access', [
        { message: 'not allowed to access', param: 'id' },
      ]);
    }

    const search = req.query.search || '';
    const status = req.query.status || '';
    let page = parseInt(req.query.page || '1');
    let limit = parseInt(req.query.limit || '10');

    let requirement = {};
    if (search) requirement.search = search;
    if (status) requirement.status = status;

    let category = await findListCategory(requirement, page, limit);

    const meta = {
      limit: limit,
      page: page,
      total_page: Math.ceil(category.count / limit),
      total_data: category.count,
    };

    return ResponseHelper(res, 200, 'success get list data category', category.rows, meta);
  } catch (error) {
    console.error(error);
    return ResponseHelper(res, 500, 'failed get category', error.message);
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

    const category = await createCategory({ ...req.body });
    return ResponseHelper(res, 201, 'success create new category', category);
  } catch (error) {
    console.error(error);
    return ResponseHelper(res, 500, 'failed create new category', error.message);
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

    // Check category is exist
    let checkCategory = await findCategoryById(id);
    if (!checkCategory) {
      return ResponseHelper(res, 409, 'category is not exist', [
        { message: 'category is not exist', param: 'id' },
      ]);
    }

    // Check role admin
    let user = await findUserById(user_id);

    if (Number(user.role) !== 1) {
      return ResponseHelper(res, 401, 'not allowed to access', [
        { message: 'not allowed to access', param: 'id' },
      ]);
    }

    // Update category
    await updateCategory({ ...req.body }, { where: { id } });

    const result = await findCategoryById(id);

    return ResponseHelper(res, 201, 'success updated selected category', result);
  } catch (error) {
    console.error(error);
    return ResponseHelper(res, 500, 'failed updated selected category', error.message);
  }
};

export { get, add, update };
