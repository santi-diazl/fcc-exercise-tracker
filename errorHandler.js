// catch-all error handler
exports.errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(err.status ? err.status : 500).send(err.message);
};
