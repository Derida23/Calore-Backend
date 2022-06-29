import { validationResult } from 'express-validator';
import ResponseHelper from '../../helpers/response_helper';
import { findUserById } from '../user/user_repository';
import { createUom, findListUom, findUomById, updateUom } from './uom_repository';

const get = async (req, res) => {
  try {
    const search = req.query.search || '';
    const status = req.query.status || '';
    let page = parseInt(req.query.page || '1');
    let limit = parseInt(req.query.limit || '10');

    let requirement = {};
    if (search) requirement.search = search;
    if (status) requirement.status = status;

    let uom = await findListUom(requirement, page, limit);

    const meta = {
      limit: limit,
      page: page,
      total_page: Math.ceil(uom.count / limit),
      total_data: uom.count,
    };

    return ResponseHelper(res, 200, 'success get list data uom', uom.rows, meta);
  } catch (error) {
    console.error(error);
    return ResponseHelper(res, 500, 'failed get uom', error.message);
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

    const uom = await createUom({ ...req.body });
    return ResponseHelper(res, 201, 'success create new uom', uom);
  } catch (error) {
    console.error(error);
    return ResponseHelper(res, 500, 'failed create new uom', error.message);
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

    // Check uom is exist
    let checkUom = await findUomById(id);
    if (!checkUom) {
      return ResponseHelper(res, 409, 'uom is not exist', [
        { message: 'uom is not exist', param: 'id' },
      ]);
    }

    // Check role admin
    let user = await findUserById(user_id);

    if (Number(user.role) !== 1) {
      return ResponseHelper(res, 401, 'not allowed to access', [
        { message: 'not allowed to access', param: 'id' },
      ]);
    }

    // Update uom
    await updateUom({ ...req.body }, { where: { id } });

    const result = await findUomById(id);

    return ResponseHelper(res, 201, 'success updated selected uom', result);
  } catch (error) {
    console.error(error);
    return ResponseHelper(res, 500, 'failed updated selected uom', error.message);
  }
};

export { get, add, update };
