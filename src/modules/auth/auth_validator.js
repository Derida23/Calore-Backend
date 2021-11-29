import { body } from 'express-validator';

const validate = (method) => {
  switch (method) {
    case 'register': {
      return [
        body('username').not().isEmpty().withMessage('username can not be empty'),
        body('password').not().isEmpty().withMessage('password can not be empty'),
        body('confirm_password').not().isEmpty().withMessage('confirm password can not be empty'),
        body('email').not().isEmpty().withMessage('email can not be empty'),
        body('email').isEmail().withMessage('email does not match the format'),
        body('fullname').not().isEmpty().withMessage('fullname can not be empty'),
        body('phone_number').not().isEmpty().withMessage('phone number can not be empty'),
        body('adress').not().isEmpty().withMessage('adress can not be empty'),
        body('adress_district').not().isEmpty().withMessage('district can not be empty'),
        body('adress_regency').not().isEmpty().withMessage('regency can not be empty'),
        body('adress_province').not().isEmpty().withMessage('province can not be empty'),
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
