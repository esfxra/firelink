const onError = async (error, req, res, next) => {
  console.log(error);
  res.status(500).end();
};

export default onError;
