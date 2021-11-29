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
