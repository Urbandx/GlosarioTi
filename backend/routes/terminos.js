const express = require('express');
const router = express.Router();
const Termino = require('../models/Termino');

// GET - Obtener todos los términos
router.get('/', async (req, res) => {
  try {
    const terminos = await Termino.find().sort({ concepto: 1 });
    res.json(terminos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - Obtener término por ID
router.get('/:id', async (req, res) => {
  try {
    const termino = await Termino.findOne({ id: parseInt(req.params.id) });
    if (!termino) {
      return res.status(404).json({ message: 'Término no encontrado' });
    }
    res.json(termino);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST - Crear nuevo término
router.post('/', async (req, res) => {
  try {
    // Validar campos requeridos
    const { concepto, definicionCorta, definicionLarga, categorias } = req.body;
    if (!concepto || !definicionCorta || !definicionLarga || !categorias) {
      return res.status(400).json({ message: 'Faltan campos requeridos' });
    }

    // Generar nuevo ID si no se proporciona
    let nuevoId = req.body.id;
    if (!nuevoId) {
      const maxIdDoc = await Termino.findOne().sort('-id').select('id');
      nuevoId = maxIdDoc ? maxIdDoc.id + 1 : 1;
    }

    const terminoData = {
      ...req.body,
      id: nuevoId
    };

    const termino = new Termino(terminoData);
    const nuevoTermino = await termino.save();
    res.status(201).json(nuevoTermino);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'El ID del término ya existe' });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
});

// DELETE - Eliminar término
router.delete('/:id', async (req, res) => {
  try {
    const termino = await Termino.findOneAndDelete({ id: parseInt(req.params.id) });
    if (!termino) {
      return res.status(404).json({ message: 'Término no encontrado' });
    }
    res.json({ message: 'Término eliminado correctamente', terminoEliminado: termino });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;