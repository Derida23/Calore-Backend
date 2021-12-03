import { validationResult } from 'express-validator';
import ResponseHelper from '../../helpers/response_helper';
import { findUserById } from '../user/user_repository';
import {
  createProduct,
  findListProduct,
  findProductById,
  updateProduct,
  upload,
} from './product_repository';
import { v4 as uuidv4 } from 'uuid';
import multer from 'multer';

const get = async (req, res) => {
  try {
    const { user_id } = req.app.locals;

    // Check role admin
    let user = await findUserById(user_id);
    if (Number(user.role) !== 1) {
      return ResponseHelper(res, 401, 'not allowed to access', [
        { message: 'not allowed to access', param: 'id' },
      ]);
    }

    const search = req.query.search || '';
    const status = req.query.status || '';
    const category_id = req.query.category_id || '';
    let page = parseInt(req.query.page || '1');
    let limit = parseInt(req.query.limit || '10');

    let requirement = {};
    if (search) requirement.search = search;
    if (status) requirement.status = status;
    if (category_id) requirement.category_id = category_id;

    let product = await findListProduct(requirement, page, limit);

    const meta = {
      limit: limit,
      page: page,
      total_page: Math.ceil(product.count / limit),
      total_data: product.count,
    };

    return ResponseHelper(res, 200, 'success get list data product', product.rows, meta);
  } catch (error) {
    console.error(error);
    return ResponseHelper(res, 500, 'failed get product', error.message);
  }
};

const add = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return ResponseHelper(res, 422, 'Validation Error', errors.array());
  }

  try {
    const { user_id } = req.app.locals;

    // Check role admin
    let user = await findUserById(user_id);
    if (Number(user.role) !== 1) {
      return ResponseHelper(res, 401, 'not allowed to access', [
        { message: 'not allowed to access', param: 'id' },
      ]);
    }

    const product = await createProduct({
      ...req.body,
      product_code: uuidv4(),
    });

    upload(req, res, async (err) => {
      if (req.fileValidationError) {
        return ResponseHelper(res, 500, 'Failed to upload image', fileValidationError);
      } else if (!req.file) {
        return ResponseHelper(res, 500, 'Please select an image to upload');
      } else if (err instanceof multer.MulterError) {
        return ResponseHelper(res, 500, 'err');
      } else if (err) {
        return ResponseHelper(res, 500, 'err');
      }

      const vanilla = {
        id: product.id,
        product_code: product.product_code,
        name: product.name,
        description: product.description,
        image: req.file.filename,
        unit_in_stock: product.unit_in_stock,
        unit_price: product.unit_price,
        uom_id: product.uom_id,
        category_id: product.category_id,
        status: product.status,
        discount_id: product.discount_id,
      };

      await updateProduct({ ...vanilla }, { where: { id: product.id } });
      let product_detail = await findProductById(product.id);

      return ResponseHelper(res, 201, 'success create new product', product_detail);
    });
  } catch (error) {
    console.error(error);
    return ResponseHelper(res, 500, 'failed create new product', error.message);
  }
};

const update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return ResponseHelper(res, 422, 'Validation Error', errors.array());
  }

  try {
    const { id } = req.params;
    const { user_id } = req.app.locals;

    // Check product is exist
    let checkDiscount = await findProductById(id);
    if (!checkDiscount) {
      return ResponseHelper(res, 409, 'product is not exist', [
        { message: 'product is not exist', param: 'id' },
      ]);
    }

    // Check role admin
    let user = await findUserById(user_id);

    if (Number(user.role) !== 1) {
      return ResponseHelper(res, 401, 'not allowed to access', [
        { message: 'not allowed to access', param: 'id' },
      ]);
    }

    // Update product
    await updateProduct({ ...req.body }, { where: { id } });

    const result = await findProductById(id);

    return ResponseHelper(res, 201, 'success updated selected product', result);
  } catch (error) {
    console.error(error);
    return ResponseHelper(res, 500, 'failed updated selected product', error.message);
  }
};

export { get, add, update };