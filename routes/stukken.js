var express = require('express');
var router = express.Router();

var stukken_controller = require('../controllers/stukkenController');

/* GET home page. */
router.get('/', stukken_controller.stukken_lijst);

module.exports = router;
