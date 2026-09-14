const mongoose = require('mongoose');

const terminoSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  concepto: {
    type: String,
    required: true,
    trim: true
  },
  definicionCorta: {
    type: String,
    required: true
  },
  definicionLarga: {
    type: String,
    required: true
  },
  ejemplos: [{
    type: String
  }],
  imagen: {
    type: String,
    default: 'img/api-icon.png'
  },
  categorias: [{
    type: String,
    required: true
  }]
}, {
  timestamps: true // Añade createdAt y updatedAt automáticamente
});

// Índice para búsquedas más rápidas
terminoSchema.index({ concepto: 'text', definicionCorta: 'text' });

module.exports = mongoose.model('Termino', terminoSchema);