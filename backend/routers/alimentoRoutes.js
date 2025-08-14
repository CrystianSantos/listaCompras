const express = require('express');
const router = express.Router();
const {
  criarLista,
  listarLista,
  atualizarLista,
  deletarLista
} = require('../controllers/alimentosController');

router.get('/', listarLista); // equivale a /lista
router.post('/', criarLista); // equivale a /lista
router.put('/:id', atualizarLista); // equivale a /lista/:id
router.delete('/:id', deletarLista); // equivale a /lista/:id

module.exports = router;
