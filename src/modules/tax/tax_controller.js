import { validationResult } from 'express-validator';
import ResponseHelper from '../../helpers/response_helper';
import { findUserById } from '../user/user_repository';
import { createTax, findListTax, findTaxById, updateTax } from './tax_repository';

const get = async (req, res) => {
  try {
    const search = req.query.search || '';
    const status = req.query.status || '';
    let page = parseInt(req.query.page || '1');
    let limit = parseInt(req.query.limit || '10');

    let requirement = {};
    if (search) requirement.search = search;
    if (status) requirement.status = status;

    let tax = await findListTax(requirement, page, limit);

    const meta = {
      limit: limit,
      page: page,
      total_page: Math.ceil(tax.count / limit),
      total_data: tax.count,
    };

    return ResponseHelper(res, 200, 'success get list data tax', tax.rows, meta);
  } catch (error) {
    console.error(error);
    return ResponseHelper(res, 500, 'failed get tax', error.message);
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

    const tax = await createTax({ ...req.body });
    return ResponseHelper(res, 201, 'success create new tax', tax);
  } catch (error) {
    console.error(error);
    return ResponseHelper(res, 500, 'failed create new tax', error.message);
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

    // Check tax is exist
    let checkTax = await findTaxById(id);
    if (!checkTax) {
      return ResponseHelper(res, 409, 'tax is not exist', [
        { message: 'tax is not exist', param: 'id' },
      ]);
    }

    // Check role admin
    let user = await findUserById(user_id);

    if (Number(user.role) !== 1) {
      return ResponseHelper(res, 401, 'not allowed to access', [
        { message: 'not allowed to access', param: 'id' },
      ]);
    }

    // Update tax
    await updateTax({ ...req.body }, { where: { id } });

    const result = await findTaxById(id);

    return ResponseHelper(res, 201, 'success updated selected tax', result);
  } catch (error) {
    console.error(error);
    return ResponseHelper(res, 500, 'failed updated selected tax', error.message);
  }
};

export { get, add, update };
