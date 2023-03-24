const router = require('express').Router();
const { pageNotFound } = require('../controllers/pagenotfound');

router.use('*', pageNotFound);
module.exports = router;
