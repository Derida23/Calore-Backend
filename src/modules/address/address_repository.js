import db from '../../database/models';
const { Provinces, Regencies, Districts } = db;
import { Op } from 'sequelize';

// Find List Province
const findListProvince = async ({ search }, page, limit) => {
  try {
    let result = await Provinces.findAndCountAll({
      where: {
        name: search ? { [Op.like]: `%${search}%` } : { [Op.like]: `%%` },
      },
      offset: limit * (page - 1),
      limit: limit,
    });
    return result;
  } catch (error) {
    console.error('[EXCEPTION] findListProvince', error);
    throw new Error(error);
  }
};

// Find List Regency
const findListRegency = async ({ search, province_id }, page, limit) => {
  try {
    let result = await Regencies.findAndCountAll({
      where: {
        name: search ? { [Op.like]: `%${search}%` } : { [Op.like]: `%%` },
        province_id: province_id ? { [Op.like]: `%${province_id}%` } : { [Op.like]: `%%` },
      },
      offset: limit * (page - 1),
      limit: limit,
    });
    return result;
  } catch (error) {
    console.error('[EXCEPTION] findListRegency', error);
    throw new Error(error);
  }
};

// Find List District
const findListDistrict = async ({ search, regency_id }, page, limit) => {
  try {
    let result = await Districts.findAndCountAll({
      where: {
        name: search ? { [Op.like]: `%${search}%` } : { [Op.like]: `%%` },
        regency_id: regency_id ? { [Op.like]: `%${regency_id}%` } : { [Op.like]: `%%` },
      },
      offset: limit * (page - 1),
      limit: limit,
    });
    return result;
  } catch (error) {
    console.error('[EXCEPTION] findListDistrict', error);
    throw new Error(error);
  }
};

export { findListProvince, findListRegency, findListDistrict };
