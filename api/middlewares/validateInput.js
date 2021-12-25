module.exports = {
  validateCensusData: (req, res, next) => {
    const input = req.body;
    next();
  }
}