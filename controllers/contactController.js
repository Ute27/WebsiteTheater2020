var Persoon = require('../models/persoon');

var async = require('async');

exports.index = function(req, res) {   
    res.render("contact");
};

exports.personen_lijst = function(req, res) {
    Persoon.find()
      .exec(function (err, lijst_personen) {
        if (err) { return next(err); }
        //Successful, so render
        res.render('contact', {personen_lijst: lijst_personen });
      });
};