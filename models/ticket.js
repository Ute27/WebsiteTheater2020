var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TicketSchema = new Schema(
  {
    toneelstuk: {type: Schema.Types.ObjectId, ref: 'Toneelstuk', required: true},
    datum_van_stuk: {type: Date, required: true},
    naam_besteller: {type: String, required: true},
    aantal_kaarten_voor_besteller: {type: String, required: true},
    email_besteller: {type: String},
    gsm_nummer_besteller: {type: String}
  }
);

//Export model
module.exports = mongoose.model('Ticket', TicketSchema);
