const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const authMiddleware = require('../middleware/auth');

// Obtener favoritos del usuario
router.get('/', authMiddleware, async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuarioId);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(usuario.favoritos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Agregar favorito
router.post('/:terminoId', authMiddleware, async (req, res) => {
  try {
    const { terminoId } = req.params;
    const usuario = await Usuario.findById(req.usuarioId);

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const id = parseInt(terminoId);
    if (!usuario.favoritos.includes(id)) {
      usuario.favoritos.push(id);
      await usuario.save();
    }

    res.json({ 
      message: 'Favorito agregado',
      favoritos: usuario.favoritos 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Eliminar favorito
router.delete('/:terminoId', authMiddleware, async (req, res) => {
  try {
    const { terminoId } = req.params;
    const usuario = await Usuario.findById(req.usuarioId);

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const id = parseInt(terminoId);
    usuario.favoritos = usuario.favoritos.filter(fav => fav !== id);
    await usuario.save();

    res.json({ 
      message: 'Favorito eliminado',
      favoritos: usuario.favoritos 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;