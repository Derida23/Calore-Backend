import db from '../../database/models';
const { Orders, OrderDetails, Products, Uoms, Varieties, Users, Taxs, Discounts } = db;
import { Op } from 'sequelize';

// Find one order by id
const findOrderById = async (id) => {
  try {
    let result = await Orders.findByPk(id);
    return result;
  } catch (error) {
    console.error('[EXCEPTION] findOrderById', error);
    throw new Error(error);
  }
};

// Find one order by filter
const findOneOrder = async (filter) => {
  try {
    let result = await Orders.findOne({
      ...filter,
    });
    return result;
  } catch (error) {
    console.error('[EXCEPTION] findOneOrder', error);
    throw new Error(error);
  }
};

// Find list order
const findListOrder = async ({ search, status, type }, page, limit) => {
  try {
    let result = await Orders.findAndCountAll({
      where: {
        name: search ? { [Op.like]: `%${search}%` } : { [Op.like]: `%%` },
        status: status ? { [Op.like]: `%${status}%` } : { [Op.like]: `%%` },
        type: type ? { [Op.like]: `%${type}%` } : { [Op.like]: `%%` },
      },

      include: [
        {
          model: Users,
          as: 'user',
          attributes: ['id', 'email', 'name'],
        },
        {
          model: Taxs,
          as: 'tax',
          attributes: { exclude: ['created_at', 'updated_at', 'deleted_at'] },
        },
        {
          model: Discounts,
          as: 'discount',
          attributes: { exclude: ['created_at', 'updated_at', 'deleted_at'] },
        },
        {
          model: OrderDetails,
          as: 'order_detail',
          attributes: { exclude: ['created_at', 'updated_at', 'deleted_at'] },
        },
      ],
      offset: limit * (page - 1),
      limit: limit,
    });
    return result;
  } catch (error) {
    console.error('[EXCEPTION] findListOrder', error);
    throw new Error(error);
  }
};

// Find Order Detail By Order Id
const findOrderDetail = async ({ order_id, search }) => {
  try {
    let result = await OrderDetails.findAll({
      include: [
        {
          model: Orders,
          as: 'order',
          attributes: { exclude: ['created_at', 'updated_at', 'deleted_at'] },
        },
        {
          model: Products,
          as: 'product',
          where: { name: search ? { [Op.like]: `%${search}%` } : { [Op.like]: `%%` } },
        },
        {
          model: Uoms,
          as: 'uom',
          attributes: { exclude: ['created_at', 'updated_at', 'deleted_at'] },
        },
        {
          model: Varieties,
          as: 'variety',
          attributes: { exclude: ['created_at', 'updated_at', 'deleted_at'] },
        },
      ],
      where: {
        order_id,
      },
    });
    return result;
  } catch (error) {
    console.error('[EXCEPTION] findOrderDetail', error);
    throw new Error(error);
  }
};

// Create new order
const createOrder = async (data, items, transaction) => {
  const t = transaction ? transaction : await db.sequelize.transaction();
  try {
    let result = await Orders.create(data, { transaction });
    await OrderDetails.bulkCreate(items, { transaction });
    if (!transaction) t.commit();
    return result;
  } catch (error) {
    if (!transaction) t.rollback();
    console.error('[EXCEPTION] createOrder', error);
    throw new Error(error);
  }
};

// Update order
const updateOrder = async (data, items, filter, transaction) => {
  const t = transaction ? transaction : await db.sequelize.transaction();
  try {
    let result = await Orders.update(data, { ...filter, transaction });
    await OrderDetails.bulkCreate(
      items,
      {
        updateOnDuplicate: ['product_id', 'uom_id', 'type_id', 'qty', 'price', 'total'],
        force: true,
      },
      { transaction }
    );
    if (!transaction) t.commit();
    return result;
  } catch (error) {
    if (!transaction) t.rollback();
    console.error('[EXCEPTION] updateOrder', error);
    throw new Error(error);
  }
};

export { findOrderById, findOneOrder, findListOrder, createOrder, updateOrder, findOrderDetail };
