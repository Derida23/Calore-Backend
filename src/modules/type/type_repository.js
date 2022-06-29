import db from '../../database/models';
const { Types } = db;
import { Op } from 'sequelize';

// Find one type by id
const findTypeById = async (id) => {
  try {
    let result = await Types.findByPk(id);
    return result;
  } catch (error) {
    console.error('[EXCEPTION] findTypeById', error);
    throw new Error(error);
  }
};

// Find one type by filter
const findTypeUom = async (filter) => {
  try {
    let result = await Types.findOne({
      ...filter,
    });
    return result;
  } catch (error) {
    console.error('[EXCEPTION] findTypeUom', error);
    throw new Error(error);
  }
};

// Find list type
const findListType = async ({ search, status }, page, limit) => {
  try {
    let result = await Types.findAndCountAll({
      where: {
        name: search ? { [Op.like]: `%${search}%` } : { [Op.like]: `%%` },
        status: status ? { [Op.like]: `%${status}%` } : { [Op.like]: `%%` },
      },
      offset: limit * (page - 1),
      limit: limit,
    });
    return result;
  } catch (error) {
    console.error('[EXCEPTION] findListType', error);
    throw new Error(error);
  }
};

// Create new type
const createType = async (data, transaction) => {
  const t = transaction ? transaction : await db.sequelize.transaction();
  try {
    let result = await Types.create(data, { transaction });
    if (!transaction) t.commit();
    return result;
  } catch (error) {
    if (!transaction) t.rollback();
    console.error('[EXCEPTION] createType', error);
    throw new Error(error);
  }
};

// Update type
const updateType = async (data, filter, transaction) => {
  const t = transaction ? transaction : await db.sequelize.transaction();
  try {
    let result = await Types.update(data, { ...filter, transaction });
    if (!transaction) t.commit();
    return result;
  } catch (error) {
    if (!transaction) t.rollback();
    console.error('[EXCEPTION] updateType', error);
    throw new Error(error);
  }
};

export { findTypeById, findTypeUom, findListType, createType, updateType };
