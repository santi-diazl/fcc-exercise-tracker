exports.errorHandler = (err, req, res, next) => {
  console.log('error handler invoked');
  console.error(err);
  res.status(err.status ? err.status : 500).send(err.message);
};
