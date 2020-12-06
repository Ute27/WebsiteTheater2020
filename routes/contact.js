var express = require('express');
var router = express.Router();

var contact_controller = require('../controllers/contactController');

/* GET users listing. */
router.get('/', contact_controller.personen_lijst);

module.exports = router;
