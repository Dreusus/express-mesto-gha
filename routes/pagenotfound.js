const router = require('express').Router();
const { pageNotFound } = require('../controllers/pagenotfound')

router.patch('*', pageNotFound)
module.exports = router;
