import { validationResult } from 'express-validator';
import ResponseHelper from '../../helpers/response_helper';
import {
  createOrder,
  findListOrder,
  findOrderById,
  findOrderDetail,
  updateOrder,
} from './order_repository';

const get = async (req, res) => {
  try {
    const order_number = req.query.order_number || '';
    const search = req.query.search || '';
    const status = req.query.status || '';
    const type = req.query.type || '';
    let page = parseInt(req.query.page || '1');
    let limit = parseInt(req.query.limit || '10');

    let requirement = {};
    if (order_number) requirement.order_number = order_number;
    if (search) requirement.search = search;
    if (status) requirement.status = status;
    if (type) requirement.type = type;

    let order = await findListOrder(requirement, page, limit);

    const meta = {
      limit: limit,
      page: page,
      total_page: Math.ceil(order.count / limit),
      total_data: order.count,
    };

    return ResponseHelper(res, 200, 'success get list data order', order.rows, meta);
  } catch (error) {
    console.error(error);
    return ResponseHelper(res, 500, 'failed get order', error.message);
  }
};

const getDetail = async (req, res) => {
  try {
    const order_id = req.query.order_id || '';
    const search = req.query.search || '';
    let page = parseInt(req.query.page || '1');
    let limit = parseInt(req.query.limit || '10');

    let requirement = {};
    if (order_id) requirement.order_id = order_id;
    if (search) requirement.search = search;

    let order = await findOrderDetail(requirement);

    const meta = {
      limit: limit,
      page: page,
      total_page: Math.ceil(order.count / limit),
      total_data: order.count,
    };

    return ResponseHelper(res, 200, 'success get list data order detail', order.rows, meta);
  } catch (error) {
    console.error(error);
    return ResponseHelper(res, 500, 'failed get order detail', error.message);
  }
};

const add = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return ResponseHelper(res, 422, 'Validation Error', errors.array());
  }

  try {
    const order = await createOrder({ ...req.body });
    return ResponseHelper(res, 201, 'success create new order', order);
  } catch (error) {
    console.error(error);
    return ResponseHelper(res, 500, 'failed create new order', error.message);
  }
};

const update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return ResponseHelper(res, 422, 'Validation Error', errors.array());
  }

  try {
    const { id } = req.params;

    // Check order is exist
    let checkDiscount = await findOrderById(id);
    if (!checkDiscount) {
      return ResponseHelper(res, 409, 'order is not exist', [
        { message: 'order is not exist', param: 'id' },
      ]);
    }

    // Update order
    await updateOrder({ ...req.body }, { where: { id } });

    const result = await findOrderById(id);

    return ResponseHelper(res, 201, 'success updated selected order', result);
  } catch (error) {
    console.error(error);
    return ResponseHelper(res, 500, 'failed updated selected order', error.message);
  }
};

export { get, add, getDetail, update };
