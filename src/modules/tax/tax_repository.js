import db from '../../database/models';
const { Taxs } = db;
import { Op } from 'sequelize';

// Find One Tax By Id
const findTaxById = async (id) => {
  try {
    let result = await Taxs.findByPk(id);
    return result;
  } catch (error) {
    console.error('[EXCEPTION] findTaxById', error);
    throw new Error(error);
  }
};

// Find One Tax By Filter
const findOneTax = async (filter) => {
  try {
    let result = await Taxs.findOne({
      ...filter,
    });
    return result;
  } catch (error) {
    console.error('[EXCEPTION] findOneTax', error);
    throw new Error(error);
  }
};

// Find List Tax
const findListTax = async ({ search, status }, page, limit) => {
  try {
    let result = await Taxs.findAndCountAll({
      where: {
        name: search ? { [Op.like]: `%${search}%` } : { [Op.like]: `%%` },
        status: status ? { [Op.like]: `%${status}%` } : { [Op.like]: `%%` },
      },
      offset: limit * (page - 1),
      limit: limit,
    });
    return result;
  } catch (error) {
    console.error('[EXCEPTION] findListTax', error);
    throw new Error(error);
  }
};

// Create New Tax
const createTax = async (data, transaction) => {
  const t = transaction ? transaction : await db.sequelize.transaction();
  try {
    let result = await Taxs.create(data, { transaction });
    if (!transaction) t.commit();
    return result;
  } catch (error) {
    if (!transaction) t.rollback();
    console.error('[EXCEPTION] createTax', error);
    throw new Error(error);
  }
};

// Update Tax
const updateTax = async (data, filter, transaction) => {
  const t = transaction ? transaction : await db.sequelize.transaction();
  try {
    let result = await Taxs.update(data, { ...filter, transaction });
    if (!transaction) t.commit();
    return result;
  } catch (error) {
    if (!transaction) t.rollback();
    console.error('[EXCEPTION] updateTax', error);
    throw new Error(error);
  }
};

export { findTaxById, findOneTax, findListTax, createTax, updateTax };
