var Toneelstuk = require('../models/toneelstuk');
var Ticket = require('../models/ticket');
const {body, validationResult} = require('express-validator');
var request = require('request');
var bodyParser = require('body-parser');


exports.info = function(req, res) {   
    Toneelstuk
    .findOne({'_id': req.params.id})
    .populate('medewerkers')
    .exec(function (err, info_stuk) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('stuk', {info: info_stuk });
    });
};


//TICKET POST
exports.ticket_create_post = [
  
  body('datum', 'Datum mag niet leeg zijn: yyyy-mm-dd').trim().isDate().escape(),
  body('naam', 'Naam mag niet leeg zijn.').trim().isLength({ min: 1 }).isAlphanumeric().escape(),
  body('aantal', 'Aantal kaarten mag niet leeg zijn.').trim().isNumeric().escape(),
  body('email', 'Geef een correct emailadres in').trim().isEmail().escape(),
  body('gsm', 'Geef een correct gsm-nummer in').trim().isMobilePhone().escape(),

  (req, res, next) => {
    const errors = validationResult(req);

      // g-recaptcha-response is the key that browser will generate upon form submit.
      // if its blank or null means user has not selected the captcha, so return the error.
      if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
        //return res.json({"responseCode" : 1,"responseDesc" : "Please select captcha"});
        // Please select captcha
        Toneelstuk
          .findOne({'_id': req.params.id})
          .populate('medewerkers')
          .exec(function (err, info_stuk) {
            if (err) { return next(err); }
            //Successful, so render
            res.render('stuk', {info: info_stuk, err: "Please select captcha", correct: false });
          });
      } else {
        // Put your secret key here.
        var secretKey = "6LemhPoZAAAAAA55sMWduXoXvImk-Xt9XXHDJ40Q";
        // req.connection.remoteAddress will provide IP address of connected user.
        var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
        // Hitting GET request to the URL, Google will respond with success or error scenario.
        request(verificationUrl, function(error,response,body) {
          body = JSON.parse(body);
          // Success will be true or false depending upon captcha validation.
          if(body.success !== undefined && !body.success) {
            Toneelstuk
              .findOne({'_id': req.params.id})
              .populate('medewerkers')
              .exec(function (err, info_stuk) {
                if (err) { return next(err); }
                //Successful, so render
                res.render('stuk', {info: info_stuk, err: "Failed captcha verification", correct: false });
              });
          } 
        
          var ticket = new Ticket(
          { datum_van_stuk: req.body.datum,
            naam_besteller: req.body.naam,
            aantal_kaarten_voor_besteller: req.body.aantal,
            email_besteller: req.body.email,
            gsm_nummer_besteller: req.body.gsm,
            toneelstuk: req.params.id
          });

          
          if(!errors.isEmpty()) {
            Toneelstuk
            .findOne({'_id': req.params.id})
            .populate('medewerkers')
            .exec(function (err, info_stuk) {
              if (err) { return next(err); }
              //Successful, so render
              res.render('stuk', {info: info_stuk , err: "Er is iets misgelopen, probeer opnieuw.", correct: false, input: ticket});
            });
          }
          else {
            ticket.save(function(err) {
              if(err) {return next(err); }
              Toneelstuk
                .findOne({'_id': req.params.id})
                .populate('medewerkers')
                .exec(function (err, info_stuk) {
                  if (err) { return next(err); }
                  //Successful, so render
                  res.render('stuk', {info: info_stuk, err: "Tickets zijn besteld!", correct: true});
                });
            });
          }
        })
      }
    }
  
];
