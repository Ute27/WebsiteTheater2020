var mongoose = require('mongoose');
const { DateTime } = require("luxon");

var Schema = mongoose.Schema;

var PersoonSchema = new Schema(
  {
    naam: {type: String, required: true, maxlength: 100},
    geboortedatum: {type: Date},
    foto_url: {type: String},
    gsm_nummer: {type: String},
    email_adres: {type: String}
  }
);

PersoonSchema
  .virtual('geboortedatumFormat')
  .get(function () {
    return DateTime.fromJSDate(this.geboortedatum).toLocaleString(DateTime.DATE_MED);
  });

PersoonSchema
  .virtual('foto')
  .get(function () {
    return "/images/" + this.foto_url
  });

//Export model
module.exports = mongoose.model('Personen', PersoonSchema);
