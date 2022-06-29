import db from '../../database/models';
const { Products, Categories, Discounts } = db;
import { Op } from 'sequelize';
import multer from 'multer';
import path from 'path';
import { imageFilter } from '../../helpers/images';

// Find one product by id
const findProductById = async (id) => {
  try {
    let result = await Products.findByPk(id);
    return result;
  } catch (error) {
    console.error('[EXCEPTION] findProductById', error);
    throw new Error(error);
  }
};

// Find one product by filter
const findOneProduct = async (filter) => {
  try {
    let result = await Products.findOne({
      ...filter,
    });
    return result;
  } catch (error) {
    console.error('[EXCEPTION] findOneProduct', error);
    throw new Error(error);
  }
};

// Find list product
const findListProduct = async ({ search, status, category_id }, page, limit) => {
  try {
    let result = await Products.findAndCountAll({
      where: {
        name: search ? { [Op.like]: `%${search}%` } : { [Op.like]: `%%` },
        status: status ? { [Op.like]: `%${status}%` } : { [Op.like]: `%%` },
        category_id: category_id ? { [Op.like]: `%${category_id}%` } : { [Op.like]: `%%` },
      },
      include: [
        {
          model: Categories,
          as: 'category',
          attributes: { exclude: ['created_at', 'updated_at', 'deleted_at'] },
        },
        {
          model: Discounts,
          as: 'discount',
          attributes: { exclude: ['created_at', 'updated_at', 'deleted_at'] },
        },
      ],
      offset: limit * (page - 1),
      limit: limit,
    });
    return result;
  } catch (error) {
    console.error('[EXCEPTION] findListProduct', error);
    throw new Error(error);
  }
};

// Field location upload
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 1000000, // 1000000 Bytes = 1 MB
  },
  fileFilter: imageFilter,
}).single('image');

// Create new product
const createProduct = async (data, transaction) => {
  const t = transaction ? transaction : await db.sequelize.transaction();
  try {
    let result = await Products.create(data, { transaction });
    if (!transaction) t.commit();
    return result;
  } catch (error) {
    if (!transaction) t.rollback();
    console.error('[EXCEPTION] createProduct', error);
    throw new Error(error);
  }
};

// Update product
const updateProduct = async (data, filter, transaction) => {
  const t = transaction ? transaction : await db.sequelize.transaction();
  try {
    let result = await Products.update(data, { ...filter, transaction });
    if (!transaction) t.commit();
    return result;
  } catch (error) {
    if (!transaction) t.rollback();
    console.error('[EXCEPTION] updateProduct', error);
    throw new Error(error);
  }
};

// Delete Product
const deleteProduct = async (product_id, transaction) => {
  const t = transaction ? transaction : await db.sequelize.transaction();
  try {
    let result = await Products.destroy({ where: { id: product_id }, force: true, transaction });
    if (!transaction) t.commit();
    return result;
  } catch (error) {
    if (!transaction) t.rollback();
    console.error('[EXCEPTION] deleteProduct', error);
    throw new Error(error);
  }
};

export {
  findProductById,
  findOneProduct,
  findListProduct,
  createProduct,
  updateProduct,
  upload,
  deleteProduct,
};
