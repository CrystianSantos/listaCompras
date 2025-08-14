const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
const alimentoRoutes = require('./routers/alimentoRoutes');
app.use('/lista', alimentoRoutes);

// Conexão com MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Conectado ao MongoDB Atlas'))
.catch((err) => console.error('Erro ao conectar:', err));

// Rota de teste
app.get('/', (req, res) => {
  res.send('lista funcionando com sucesso!');
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
