var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const { DateTime } = require("luxon");

var ToneelstukSchema = new Schema(
  {
    naam: {type: String, required: true, maxlength: 100},
    korte_inhoud: {type: String, required: true},
    prijs_tickets: {type: Number},
    data_voorstelling: [{type: Date, require: true}],
    medewerkers: [{type: Schema.Types.ObjectId, ref: 'Personen', required: true}],
    foto_naam: {type: String, required: true}
  }
);

// Virtual for author's full name
ToneelstukSchema
  .virtual('url')
  .get(function () {
    return '/stuk/' + this._id;
  });

ToneelstukSchema
  .virtual('url_onclick')
  .get(function () {
    return "window.location.href='/stuk/" + this._id + "'"
  });

ToneelstukSchema
  .virtual('foto_url')
  .get(function () {
    return "/images/" + this.foto_naam
  });

ToneelstukSchema
  .virtual('datumrange')
  .get(function () {
    let begin = DateTime.fromJSDate(this.data_voorstelling[0]).toLocaleString(DateTime.DATE_MED);
    let eind = DateTime.fromJSDate(this.data_voorstelling[this.data_voorstelling.length - 1]).toLocaleString(DateTime.DATE_MED);
    return begin + " - " + eind
  });

ToneelstukSchema
  .virtual('alledata')
  .get(function () {
    let str = ""
    let i
    for (i = 0; i < this.data_voorstelling.length; i++){
      str += DateTime.fromJSDate(this.data_voorstelling[i]).toLocaleString(DateTime.DATE_MED);
      if (i != this.data_voorstelling.length - 1) str += ', '
    }
    return str
  });

ToneelstukSchema
  .virtual('alvoorbij')
  .get(function () {
    return (new Date() > this.data_voorstelling[this.data_voorstelling.length - 1])
  });

//Export model
module.exports = mongoose.model('toneelstuk', ToneelstukSchema);