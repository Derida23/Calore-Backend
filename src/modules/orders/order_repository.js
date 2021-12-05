import db from '../../database/models';
const { Discounts } = db;
import { Op } from 'sequelize';

// Find one discount by id
const findDiscountById = async (id) => {
  try {
    let result = await Discounts.findByPk(id);
    return result;
  } catch (error) {
    console.error('[EXCEPTION] findDiscountById', error);
    throw new Error(error);
  }
};

// Find one discount by filter
const findOneDiscount = async (filter) => {
  try {
    let result = await Discounts.findOne({
      ...filter,
    });
    return result;
  } catch (error) {
    console.error('[EXCEPTION] findOneDiscount', error);
    throw new Error(error);
  }
};

// Find list discount
const findListDiscount = async ({ search, status, type }, page, limit) => {
  try {
    let result = await Discounts.findAndCountAll({
      where: {
        name: search ? { [Op.like]: `%${search}%` } : { [Op.like]: `%%` },
        status: status ? { [Op.like]: `%${status}%` } : { [Op.like]: `%%` },
        type: type ? { [Op.like]: `%${type}%` } : { [Op.like]: `%%` },
      },
      offset: limit * (page - 1),
      limit: limit,
    });
    return result;
  } catch (error) {
    console.error('[EXCEPTION] findListDiscount', error);
    throw new Error(error);
  }
};

// Create new discount
const createDiscount = async (data, transaction) => {
  const t = transaction ? transaction : await db.sequelize.transaction();
  try {
    let result = await Discounts.create(data, { transaction });
    if (!transaction) t.commit();
    return result;
  } catch (error) {
    if (!transaction) t.rollback();
    console.error('[EXCEPTION] createDiscount', error);
    throw new Error(error);
  }
};

// Update Discount
const updateDiscount = async (data, filter, transaction) => {
  const t = transaction ? transaction : await db.sequelize.transaction();
  try {
    let result = await Discounts.update(data, { ...filter, transaction });
    if (!transaction) t.commit();
    return result;
  } catch (error) {
    if (!transaction) t.rollback();
    console.error('[EXCEPTION] updateDiscount', error);
    throw new Error(error);
  }
};

export { findDiscountById, findOneDiscount, findListDiscount, createDiscount, updateDiscount };
