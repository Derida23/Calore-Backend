import ResponseHelper from '../../helpers/response_helper';
import { findListProvince, findListRegency, findListDistrict } from './address_repository';

const province = async (req, res) => {
  try {
    const search = req.query.search || '';
    let page = parseInt(req.query.page || '1');
    let limit = parseInt(req.query.limit || '50');

    let requirement = {};
    if (search) requirement.search = search;

    let province = await findListProvince(requirement, page, limit);

    const meta = {
      limit: limit,
      page: page,
      total_page: Math.ceil(province.count / limit),
      total_data: province.count,
    };

    return ResponseHelper(res, 200, 'success get list data province', province.rows, meta);
  } catch (error) {
    console.error(error);
    return ResponseHelper(res, 500, 'failed get province', error.message);
  }
};

const regency = async (req, res) => {
  try {
    const search = req.query.search || '';
    const province_id = req.query.province_id || '';
    let page = parseInt(req.query.page || '1');
    let limit = parseInt(req.query.limit || '50');

    let requirement = {};
    if (search) requirement.search = search;
    if (province_id) requirement.province_id = province_id;

    let regency = await findListRegency(requirement, page, limit);

    const meta = {
      limit: limit,
      page: page,
      total_page: Math.ceil(regency.count / limit),
      total_data: regency.count,
    };

    return ResponseHelper(res, 200, 'success get list data regency', regency.rows, meta);
  } catch (error) {
    console.error(error);
    return ResponseHelper(res, 500, 'failed get regency', error.message);
  }
};

const district = async (req, res) => {
  try {
    const search = req.query.search || '';
    const regency_id = req.query.regency_id || '';
    let page = parseInt(req.query.page || '1');
    let limit = parseInt(req.query.limit || '50');

    let requirement = {};
    if (search) requirement.search = search;
    if (regency_id) requirement.regency_id = regency_id;

    let district = await findListDistrict(requirement, page, limit);

    const meta = {
      limit: limit,
      page: page,
      total_page: Math.ceil(district.count / limit),
      total_data: district.count,
    };

    return ResponseHelper(res, 200, 'success get list data district', district.rows, meta);
  } catch (error) {
    console.error(error);
    return ResponseHelper(res, 500, 'failed get district', error.message);
  }
};

export { province, regency, district };
