import { body } from 'express-validator';

const validate = (method) => {
  switch (method) {
    case 'category': {
      return [
        body('name').not().isEmpty().withMessage('name can not be empty'),
        body('description').not().isEmpty().withMessage('description can not be empty'),
      ];
    }
    default:
      return [];
  }
};

export default validate;
