const authMiddleware = (req, res, next) => {
  console.log("Auth middleware");
  next();
};

module.exports = authMiddleware;
