/**
 *
 * Error Code
 * 200 Succes get api
 * 201 Succes edit api
 * 401 Unauthorized token
 * 404 Data not found
 * 500 Failed retrive api
 * 409 If Data is Exist
 * 422 Error validasi
 *
 */

const ResponseHelper = async (res, code, message, data, meta) => {
  const { responseReff } = res.app.locals;
  const response = {
    code,
    message,
    data,
    meta,
    responseReff,
  };

  res.status(code).send(response);
};

export default ResponseHelper;
