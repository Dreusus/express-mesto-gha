const { NotFound } = require('../utils/errorcode');

const pageNotFound = (req, res) => {
  res.status(NotFound).send({ message: '404 - Page Not Found' });
};

module.exports = { pageNotFound };
