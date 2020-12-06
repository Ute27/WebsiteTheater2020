var Toneelstuk = require('../models/toneelstuk');

exports.index = function(req, res) {   
    res.render("stukken");
};

exports.stukken_lijst = function(req, res) {
      Toneelstuk
        .find()
        // nieuwste voorstellingen eerst
        .sort({data_voorstelling: -1})
        .exec(function (err, lijst_stukken) {
          if (err) { return next(err); }
          //Successful, so render
          res.render('stukken', {stukken_lijst: lijst_stukken});
        });
  };