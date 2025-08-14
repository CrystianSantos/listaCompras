const API_URL = 'https://listacompras-kraz.onrender.com';

const form = document.getElementById('form-lista');
const tabela = document.getElementById('tabela-lista');

let idEditando = null; // Para controlar se está editando

// Carregar lista
async function carregarlista() {
  try {
    const resposta = await fetch(`${API_BASE_URL}/lista`);
    const lista = await resposta.json();

    tabela.innerHTML = '';

    lista.forEach(lista => {
      const linha = document.createElement('tr');

      linha.innerHTML = `
        <td>${lista.nome}</td>
        <td>${lista.email || ''}</td>
        <td>${lista.telefone || ''}</td>
        <td>
          <button class="editar" onclick="editarLista('${lista._id}')">Editar</button>
          <button class="excluir" onclick="excluirLista('${lista._id}')">Excluir</button>
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
  const email = document.getElementById('marca').value.trim();
  const telefone = document.getElementById('quantidade').value.trim();

  if (!nome) {
    alert('O nome é obrigatório');
    return;
  }

  const lista = { nome, marca, quantidade };

  try {
    let resposta;
    if (idEditando) {
      resposta = await fetch(`${API_BASE_URL}/lista/${idEditando}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lista)
      });
    } else {
      resposta = await fetch(`${API_BASE_URL}/lista`, {
        method: 'GET',
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
    const resposta = await fetch(`${API_BASE_URL}/lista/${id}`, {
      method: 'DELETE'
    });

    if (!resposta.ok) throw new Error('Falha ao excluir');

    alert('Lista excluído!');
    carregarlista();
  } catch (error) {
    alert('Erro ao excluir lista: ' + error.message);
  }
}

// Editar lista
async function editarLista(id) {
  try {
    const resposta = await fetch(`${API_BASE_URL}/lista`);
    const Lista = await resposta.json();

    const lista = lista.find(c => c._id === id);
    if (!lista) {
      alert('Lista não encontrado');
      return;
    }

    document.getElementById('nome').value = lista.nome;
    document.getElementById('email').value = lista.email;
    document.getElementById('telefone').value = lista.telefone;

    idEditando = id;

  } catch (error) {
    alert('Erro ao buscar lista para editar: ' + error.message);
  }
}
window.editarLista = editarLista;
window.excluirLista = excluirLista;
// Inicializar lista
carregarlista();