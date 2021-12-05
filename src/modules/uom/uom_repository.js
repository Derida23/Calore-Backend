import db from '../../database/models';
const { Uoms } = db;
import { Op } from 'sequelize';

// Find one uom by id
const findUomById = async (id) => {
  try {
    let result = await Uoms.findByPk(id);
    return result;
  } catch (error) {
    console.error('[EXCEPTION] findUomById', error);
    throw new Error(error);
  }
};

// Find one uom by filter
const findOneUom = async (filter) => {
  try {
    let result = await Uoms.findOne({
      ...filter,
    });
    return result;
  } catch (error) {
    console.error('[EXCEPTION] findOneUom', error);
    throw new Error(error);
  }
};

// Find list uom
const findListUom = async ({ search, status }, page, limit) => {
  try {
    let result = await Uoms.findAndCountAll({
      where: {
        name: search ? { [Op.like]: `%${search}%` } : { [Op.like]: `%%` },
        status: status ? { [Op.like]: `%${status}%` } : { [Op.like]: `%%` },
      },
      offset: limit * (page - 1),
      limit: limit,
    });
    return result;
  } catch (error) {
    console.error('[EXCEPTION] findListUom', error);
    throw new Error(error);
  }
};

// Create new uom
const createUom = async (data, transaction) => {
  const t = transaction ? transaction : await db.sequelize.transaction();
  try {
    let result = await Uoms.create(data, { transaction });
    if (!transaction) t.commit();
    return result;
  } catch (error) {
    if (!transaction) t.rollback();
    console.error('[EXCEPTION] createUom', error);
    throw new Error(error);
  }
};

// Update uom
const updateUom = async (data, filter, transaction) => {
  const t = transaction ? transaction : await db.sequelize.transaction();
  try {
    let result = await Uoms.update(data, { ...filter, transaction });
    if (!transaction) t.commit();
    return result;
  } catch (error) {
    if (!transaction) t.rollback();
    console.error('[EXCEPTION] updateUom', error);
    throw new Error(error);
  }
};

export { findUomById, findOneUom, findListUom, createUom, updateUom };
