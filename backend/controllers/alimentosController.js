const Lista = require('../models/ListaModel');

// Criar novo Lista
const criarLista = async (req, res) => {
  try {
    const novaLista = new Lista(req.body);
    await novaLista.save();
    res.status(201).json(novaLista);
  } catch (error) {
    res.status(400).json({ mensagem: 'Erro ao criar lista', erro: error.message });
  }
};

// Listar todas as compras
const listarLista = async (req, res) => {
  try {
    const compras = await Lista.find();
    res.status(200).json(compras);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao listar compras', erro: error.message });
  }
};

// Atualizar Lista por ID
const atualizarLista = async (req, res) => {
  try {
    const listaAtualizada = await Lista.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!listaAtualizada) return res.status(404).json({ mensagem: 'Lista não encontrada' });
    res.status(200).json(listaAtualizada);
  } catch (error) {
    res.status(400).json({ mensagem: 'Erro ao atualizar Lista', erro: error.message });
  }
};

// Excluir Lista por ID
const deletarLista = async (req, res) => {
  try {
    const ListaExcluido = await Lista.findByIdAndDelete(req.params.id);
    if (!ListaExcluido) return res.status(404).json({ mensagem: 'Lista não encontrado' });
    res.status(200).json({ mensagem: 'Lista excluído com sucesso' });
  } catch (error) {
    res.status(400).json({ mensagem: 'Erro ao excluir Lista', erro: error.message });
  }
};

module.exports = {
  criarLista,
  listarLista,
  atualizarLista,
  deletarLista
};