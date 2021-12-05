import { validationResult } from 'express-validator';
import ResponseHelper from '../../helpers/response_helper';
import { findUserById } from '../user/user_repository';
import {
  createDiscount,
  findListDiscount,
  findDiscountById,
  updateDiscount,
} from './discount_repository';

const get = async (req, res) => {
  try {
    const search = req.query.search || '';
    const status = req.query.status || '';
    const type = req.query.type || '';
    let page = parseInt(req.query.page || '1');
    let limit = parseInt(req.query.limit || '10');

    let requirement = {};
    if (search) requirement.search = search;
    if (status) requirement.status = status;
    if (type) requirement.type = type;

    let discount = await findListDiscount(requirement, page, limit);

    const meta = {
      limit: limit,
      page: page,
      total_page: Math.ceil(discount.count / limit),
      total_data: discount.count,
    };

    return ResponseHelper(res, 200, 'success get list data discount', discount.rows, meta);
  } catch (error) {
    console.error(error);
    return ResponseHelper(res, 500, 'failed get discount', error.message);
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

    const discount = await createDiscount({ ...req.body });
    return ResponseHelper(res, 201, 'success create new discount', discount);
  } catch (error) {
    console.error(error);
    return ResponseHelper(res, 500, 'failed create new discount', error.message);
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

    // Check discount is exist
    let checkDiscount = await findDiscountById(id);
    if (!checkDiscount) {
      return ResponseHelper(res, 409, 'discount is not exist', [
        { message: 'discount is not exist', param: 'id' },
      ]);
    }

    // Check role admin
    let user = await findUserById(user_id);

    if (Number(user.role) !== 1) {
      return ResponseHelper(res, 401, 'not allowed to access', [
        { message: 'not allowed to access', param: 'id' },
      ]);
    }

    // Update discount
    await updateDiscount({ ...req.body }, { where: { id } });

    const result = await findDiscountById(id);

    return ResponseHelper(res, 201, 'success updated selected discount', result);
  } catch (error) {
    console.error(error);
    return ResponseHelper(res, 500, 'failed updated selected discount', error.message);
  }
};

export { get, add, update };
