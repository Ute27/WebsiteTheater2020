var express = require('express');
var router = express.Router();

var stuk_controller = require('../controllers/stukController');
var stukken_controller = require('../controllers/stukkenController');

//- '/stuk' (zonder id) is ongeldig: redirect naar stukken
router.get('/', stukken_controller.stukken_lijst);

router.get('/:id', stuk_controller.info);

router.post('/:id', stuk_controller.ticket_create_post);

module.exports = router;
