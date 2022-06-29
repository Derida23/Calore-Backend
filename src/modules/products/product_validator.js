import { body } from 'express-validator';

const validate = (method) => {
  switch (method) {
    case 'prouct': {
      return [
        body('name').not().isEmpty().withMessage('name can not be empty'),
        body('description').not().isEmpty().withMessage('description can not be empty'),
        body('unit_in_stock').not().isEmpty().withMessage('stock can not be empty'),
        body('unit_price').not().isEmpty().withMessage('price can not be empty'),
        body('category_id').not().isEmpty().withMessage('category can not be empty'),
      ];
    }
    default:
      return [];
  }
};

export default validate;
