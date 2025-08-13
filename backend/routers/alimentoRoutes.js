const express = require('express');
const router = express.Router();
const {
  criarLista,
  listarLista,
  atualizarLista,
  deletarLista
} = require('../controllers/alimentosController');

// Rota POST - Criar Lista
router.post('/Listas', criarLista);

// Rota GET - Listar todos os Listas
router.get('/Listas', listarLista);

// Rota PUT - Atualizar Lista por ID
router.put('/Listas/:id', atualizarLista);

// Rota DELETE - Excluir Lista por ID
router.delete('/Listas/:id', deletarLista);

module.exports = router;
