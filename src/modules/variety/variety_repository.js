import db from '../../database/models';
const { Varieties } = db;
import { Op } from 'sequelize';

// Find one variety by id
const findVarietyById = async (id) => {
  try {
    let result = await Varieties.findByPk(id);
    return result;
  } catch (error) {
    console.error('[EXCEPTION] findVarietyById', error);
    throw new Error(error);
  }
};

// Find one variety by filter
const findOneVariety = async (filter) => {
  try {
    let result = await Varieties.findOne({
      ...filter,
    });
    return result;
  } catch (error) {
    console.error('[EXCEPTION] findOneVariety', error);
    throw new Error(error);
  }
};

// Find list variety
const findListVariety = async ({ search, status }, page, limit) => {
  try {
    let result = await Varieties.findAndCountAll({
      where: {
        name: search ? { [Op.like]: `%${search}%` } : { [Op.like]: `%%` },
        status: status ? { [Op.like]: `%${status}%` } : { [Op.like]: `%%` },
      },
      offset: limit * (page - 1),
      limit: limit,
    });
    return result;
  } catch (error) {
    console.error('[EXCEPTION] findListVariety', error);
    throw new Error(error);
  }
};

// Create new variety
const createVariety = async (data, transaction) => {
  const t = transaction ? transaction : await db.sequelize.transaction();
  try {
    let result = await Varieties.create(data, { transaction });
    if (!transaction) t.commit();
    return result;
  } catch (error) {
    if (!transaction) t.rollback();
    console.error('[EXCEPTION] createVariety', error);
    throw new Error(error);
  }
};

// Update variety
const updateVariety = async (data, filter, transaction) => {
  const t = transaction ? transaction : await db.sequelize.transaction();
  try {
    let result = await Varieties.update(data, { ...filter, transaction });
    if (!transaction) t.commit();
    return result;
  } catch (error) {
    if (!transaction) t.rollback();
    console.error('[EXCEPTION] updateVariety', error);
    throw new Error(error);
  }
};

export { findVarietyById, findOneVariety, findListVariety, createVariety, updateVariety };
