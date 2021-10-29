const mongoose = require('mongoose');

const aboutInfoSchema = new mongoose.Schema({
  userLogin: {
    type: String,
    required: true,
  },
  nome: {
    type: String,
    required: true,
    default: false,
  },
  itens: [
    {
      key: String,
      value: String,
    },
  ],
});

module.exports = mongoose.model('aboutInfo', aboutInfoSchema);
