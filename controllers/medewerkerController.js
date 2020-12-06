var Persoon = require('../models/persoon');

exports.personen_lijst = function(req, res) {
    Persoon.find()
      .exec(function (err, lijst_personen) {
        if (err) { return next(err); }
        //Successful, so render
        res.render('medewerkers', {personen_lijst: lijst_personen });
      });
};