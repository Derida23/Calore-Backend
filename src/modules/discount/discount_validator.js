import { body } from 'express-validator';

const validate = (method) => {
  switch (method) {
    case 'discount': {
      return [
        body('name').not().isEmpty().withMessage('name can not be empty'),
        body('description').not().isEmpty().withMessage('description can not be empty'),
        body('percentage').not().isEmpty().withMessage('percentage can not be empty'),
        body('type').not().isEmpty().withMessage('type can not be empty'),
        body('date_from').not().isEmpty().withMessage('date from can not be empty'),
        body('date_to').not().isEmpty().withMessage('date to can not be empty'),
      ];
    }
    default:
      return [];
  }
};

export default validate;
