import { body } from 'express-validator';

const validate = (method) => {
  switch (method) {
    case 'register': {
      return [
        body('email').not().isEmpty().withMessage('email can not be empty'),
        body('email').isEmail().withMessage('email does not match the format'),
        body('password').not().isEmpty().withMessage('password can not be empty'),
        body('confirm_password').not().isEmpty().withMessage('confirm password can not be empty'),
        body('role').not().isEmpty().withMessage('role can not be empty'),
        body('name').not().isEmpty().withMessage('name can not be empty'),
        body('phone').not().isEmpty().withMessage('phone can not be empty'),
        body('adress').not().isEmpty().withMessage('adress can not be empty'),
        body('districts').not().isEmpty().withMessage('districts can not be empty'),
        body('regencies').not().isEmpty().withMessage('regencies can not be empty'),
        body('provinces').not().isEmpty().withMessage('provinces can not be empty'),
      ];
    }
    case 'login': {
      return [
        body('email').not().isEmpty().withMessage('email can not be empty'),
        body('email').isEmail().withMessage('email does not match the format'),
        body('password').not().isEmpty().withMessage('password can not be empty'),
      ];
    }

    default:
      return [];
  }
};

export default validate;
