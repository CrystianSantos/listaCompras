const API_URL = 'https://listacompras-kraz.onrender.com';

const form = document.getElementById('form-lista');
const tabela = document.getElementById('tabela-lista');

let idEditando = null;

// Carregar lista
async function carregarlista() {
  try {
    const resposta = await fetch(`${API_URL}/lista`);
    const lista = await resposta.json();

    tabela.innerHTML = '';

    lista.forEach(item => {
      const linha = document.createElement('tr');

      linha.innerHTML = `
        <td>${item.nome}</td>
        <td>${item.marca || ''}</td>
        <td>${item.quantidade || ''}</td>
        <td>
          <button class="editar" onclick="editarLista('${item._id}')">Editar</button>
          <button class="excluir" onclick="excluirLista('${item._id}')">Excluir</button>
        </td>
      `;

      tabela.appendChild(linha);
    });
  } catch (error) {
    alert('Erro ao carregar lista: ' + error.message);
  }
}

// Enviar formulário (criar ou atualizar)
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const marca = document.getElementById('marca').value.trim();
  const quantidade = document.getElementById('quantidade').value.trim();

  if (!nome) {
    alert('O nome é obrigatório');
    return;
  }

  const lista = { nome, marca, quantidade };

  try {
    let resposta;
    if (idEditando) {
      resposta = await fetch(`${API_URL}/lista/${idEditando}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lista)
      });
    } else {
      resposta = await fetch(`${API_URL}/lista`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lista)
      });
    }

    if (!resposta.ok) {
      const erro = await resposta.json();
      throw new Error(erro.mensagem || 'Erro desconhecido');
    }

    alert(idEditando ? 'Lista atualizada!' : 'Lista criada!');
    idEditando = null;
    form.reset();
    carregarlista();

  } catch (error) {
    alert('Erro ao salvar lista: ' + error.message);
  }
});

// Excluir lista
async function excluirLista(id) {
  if (!confirm('Deseja realmente excluir essa lista?')) return;

  try {
    const resposta = await fetch(`${API_URL}/lista/${id}`, {
      method: 'DELETE'
    });

    if (!resposta.ok) throw new Error('Falha ao excluir');

    alert('Lista excluída!');
    carregarlista();
  } catch (error) {
    alert('Erro ao excluir lista: ' + error.message);
  }
}

// Editar lista
async function editarLista(id) {
  try {
    const resposta = await fetch(`${API_URL}/lista`);
    const listas = await resposta.json();

    const lista = listas.find(c => c._id === id);
    if (!lista) {
      alert('Lista não encontrada');
      return;
    }

    document.getElementById('nome').value = lista.nome;
    document.getElementById('marca').value = lista.marca;
    document.getElementById('quantidade').value = lista.quantidade;

    idEditando = id;

  } catch (error) {
    alert('Erro ao buscar lista para editar: ' + error.message);
  }
}
window.editarLista = editarLista;
window.excluirLista = excluirLista;
// Inicializar lista
carregarlista();