import { body } from 'express-validator';

const validate = (method) => {
  switch (method) {
    case 'order': {
      return [
        body('name').not().isEmpty().withMessage('name can not be empty'),
        body('type').not().isEmpty().withMessage('type can not be empty'),
        body('total').not().isEmpty().withMessage('total can not be empty'),
        body('tax_id').not().isEmpty().withMessage('tax can not be empty'),
        body('date_to').not().isEmpty().withMessage('date to can not be empty'),
      ];
    }
    default:
      return [];
  }
};

export default validate;
