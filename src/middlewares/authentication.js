import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/env';
import ResponseHelper from '../helpers/response_helper';
import { getToken } from '../helpers/authentication';

const authentication = async (req, res, next) => {
  try {
    const noauth = req.query.noauth;
    if (noauth) return next();

    const token = getToken(req.headers.authorization);
    if (!token) {
      return ResponseHelper(res, 401, 'Unauthorized Access', null);
    }

    jwt.verify(token, jwtSecret, (error, decoded) => {
      if (
        (error && error.name === 'JsonWebTokenError') ||
        (error && error.name === 'TokenExpiredError')
      ) {
        return ResponseHelper(res, 401, error.message, null);
      }
    });
  } catch (error) {
    console.error(error);
    return ResponseHelper(res, 401, error.message, null);
  }
};

export default authentication;
