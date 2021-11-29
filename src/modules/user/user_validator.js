import { body } from 'express-validator';

const validate = (method) => {
  switch (method) {
    case 'update': {
      return [
        body('name').not().isEmpty().withMessage('name can not be empty'),
        body('status').not().isEmpty().withMessage('status can not be empty'),
        body('phone').not().isEmpty().withMessage('phone number can not be empty'),
        body('address').not().isEmpty().withMessage('address can not be empty'),
        body('districts').not().isEmpty().withMessage('districts can not be empty'),
        body('regencies').not().isEmpty().withMessage('regencies can not be empty'),
        body('provinces').not().isEmpty().withMessage('provinces  can not be empty'),
      ];
    }
    default:
      return [];
  }
};

export default validate;
