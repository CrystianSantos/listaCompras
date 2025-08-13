const mongoose = require('mongoose');

const ListaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  marca: [{ type: String }],
  quantidade: [{ type: String }]
});

module.exports = mongoose.model('Lista', ListaSchema);