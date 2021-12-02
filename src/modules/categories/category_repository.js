import db from '../../database/models';
const { Categories } = db;
import { Op } from 'sequelize';

// Find one category by id
const findCategoryById = async (id) => {
  try {
    let result = await Categories.findByPk(id);
    return result;
  } catch (error) {
    console.error('[EXCEPTION] findCategoryById', error);
    throw new Error(error);
  }
};

// Find one category by filter
const findOneCategory = async (filter) => {
  try {
    let result = await Categories.findOne({
      ...filter,
    });
    return result;
  } catch (error) {
    console.error('[EXCEPTION] findOneCategory', error);
    throw new Error(error);
  }
};

// Find list category
const findListCategory = async ({ search }, page, limit) => {
  try {
    let result = await Categories.findAndCountAll({
      where: {
        name: search ? { [Op.like]: `%${search}%` } : { [Op.like]: `%%` },
      },
      offset: limit * (page - 1),
      limit: limit,
    });
    return result;
  } catch (error) {
    console.error('[EXCEPTION] findListCategory', error);
    throw new Error(error);
  }
};

// Create new category
const createCategory = async (data, transaction) => {
  const t = transaction ? transaction : await db.sequelize.transaction();
  try {
    let result = await Categories.create(data, { transaction });
    if (!transaction) t.commit();
    return result;
  } catch (error) {
    if (!transaction) t.rollback();
    console.error('[EXCEPTION] createCategory', error);
    throw new Error(error);
  }
};

// Update category
const updateCategory = async (data, filter, transaction) => {
  const t = transaction ? transaction : await db.sequelize.transaction();
  try {
    let result = await Categories.update(data, { ...filter, transaction });
    if (!transaction) t.commit();
    return result;
  } catch (error) {
    if (!transaction) t.rollback();
    console.error('[EXCEPTION] updateCategory', error);
    throw new Error(error);
  }
};

export { findCategoryById, findOneCategory, findListCategory, createCategory, updateCategory };
