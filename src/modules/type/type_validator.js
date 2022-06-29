import { body } from 'express-validator';

const validate = (method) => {
  switch (method) {
    case 'type': {
      return [body('name').not().isEmpty().withMessage('name can not be empty')];
    }
    default:
      return [];
  }
};

export default validate;
