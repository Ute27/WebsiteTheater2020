var express = require('express');
var router = express.Router();

var medewerker_controller = require('../controllers/medewerkerController');

/* GET home page. */
router.get('/', medewerker_controller.personen_lijst);

module.exports = router;
