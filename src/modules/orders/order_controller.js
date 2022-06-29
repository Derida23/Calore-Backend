import ResponseHelper from '../../helpers/response_helper';
import {
  createOrder,
  findListOrder,
  findOrderById,
  findOrderDetail,
  updateOrder,
} from './order_repository';
import { findProductById } from '../products/product_repository';
import { findDiscountById } from '../discount/discount_repository';
import { findTaxById } from '../tax/tax_repository';
import { v4 as uuidv4 } from 'uuid';

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
    const order_id = req.params.id || '';
    const search = req.query.search || '';

    let requirement = {};
    if (order_id) requirement.order_id = order_id;
    if (search) requirement.search = search;

    let order = await findOrderDetail(requirement);

    const meta = {
      limit: order.length,
      page: 1,
      total_page: 1,
      total_data: order.length,
    };

    return ResponseHelper(res, 200, 'success get list data order detail', order, meta);
  } catch (error) {
    console.error(error);
    return ResponseHelper(res, 500, 'failed get order detail', error.message);
  }
};

const add = async (req, res) => {
  try {
    const { user_id } = req.app.locals;

    let productDb = [];
    let discDb = null;
    let taxDb = null;
    let items = [];
    let listOrder = await findListOrder({}, 1, 1);

    for (let it of req.body.items) {
      let temporary = await findProductById(it.product_id);
      productDb.push(temporary);
    }

    if (req.body.discount_id) discDb = await findDiscountById(req.body.discount_id);
    if (req.body.tax_id) taxDb = await findTaxById(req.body.tax_id);

    for (let [index, it] of req.body.items.entries()) {
      items.push({
        order_id: listOrder.count === 0 ? listOrder.count + 1 : listOrder.count,
        product_id: it.product_id,
        uom_id: it.uom_id,
        variety_id: it.variety_id,
        qty: it.qty,
        price: productDb[index].unit_price,
        total: productDb[index].unit_price * it.qty,
      });
    }

    let subtotal = items.reduce((a, item) => a + item.total, 0);
    let price_discount = 0;
    let price_tax = 0;
    let total = 0;

    if (discDb) price_discount = subtotal * (discDb.percentage / 100);
    if (taxDb) price_tax = taxDb.type === 2 ? subtotal * (taxDb.percentage / 100) : 0;

    total = subtotal - price_discount + price_tax;

    const vanilla = {
      order_number: uuidv4(),
      name: req.body.name,
      user_id,
      type: req.body.type,
      remark: req.body.remark,
      reason: req.body.reason,
      subtotal,
      total,
      tax_id: req.body.tax_id,
      discount_id: req.body.discount_id,
    };

    const order = await createOrder({ ...vanilla }, items);
    return ResponseHelper(res, 201, 'success create new order', order);
  } catch (error) {
    console.error(error);
    return ResponseHelper(res, 500, 'failed create new order', error.message);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.app.locals;

    let productDb = [];
    let discDb = [];
    let taxDb = [];
    let items = [];
    let order = await findOrderById(id);

    const order_id = req.params.id || '';

    let requirement = {};
    if (order_id) requirement.order_id = order_id;

    let list = await findOrderDetail(requirement);

    let temporary = [];
    for (let [, it] of list.entries()) {
      temporary.push({
        id: it.id,
        order_id: it.order_id,
        product_id: it.product_id,
        uom_id: it.uom_id,
        variety_id: it.variety_id,
        qty: it.qty,
        price: it.price,
        total: it.total,
      });
    }

    for (let it of req.body.items) {
      let temporary = await findProductById(it.product_id);
      productDb.push(temporary);
    }

    if (req.body.discount_id) discDb = await findDiscountById(req.body.discount_id);
    if (req.body.tax_id) taxDb = await findTaxById(req.body.tax_id);

    for (let [index, it] of req.body.items.entries()) {
      items.push({
        id: it.id,
        order_id: id,
        product_id: it.product_id,
        uom_id: it.uom_id,
        variety_id: it.variety_id,
        qty: it.qty,
        price: productDb[index].unit_price,
        total: productDb[index].unit_price * it.qty,
      });
    }

    let subtotal = items.reduce((a, item) => a + item.total, 0);
    let price_discount = 0;
    let price_tax = 0;
    let total = 0;

    if (discDb) price_discount = subtotal * (discDb.percentage / 100);
    if (taxDb) price_tax = taxDb.type === 2 ? subtotal * (taxDb.percentage / 100) : 0;

    total = subtotal - price_discount + price_tax;

    const vanilla = {
      order_number: order.order_number,
      name: req.body.name,
      user_id,
      type: req.body.type,
      remark: req.body.remark,
      reason: req.body.reason,
      subtotal,
      total,
      tax_id: req.body.tax_id,
      discount_id: req.body.discount_id,
    };

    // Update order
    await updateOrder({ ...vanilla }, items, { where: { id } });

    const result = await findOrderById(id);

    return ResponseHelper(res, 201, 'success updated selected order', result);
  } catch (error) {
    console.error(error);
    return ResponseHelper(res, 500, 'failed updated selected order', error.message);
  }
};

export { get, add, getDetail, update };
