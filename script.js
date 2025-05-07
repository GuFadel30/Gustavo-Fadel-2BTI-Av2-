// Simulando uma "classe Receita" com função construtora (como em Python)
function Receita(titulo, ingredientes, tempo) {
  this.titulo = titulo;
  this.ingredientes = ingredientes;
  this.tempo = tempo;

  // Simulando método da classe Python
  this.descricao = function () {
    return `${this.titulo} - ${this.tempo} min | Ingredientes: ${this.ingredientes.join(', ')}`;
  };
}

// Array para armazenar receitas (simula lista de instâncias)
let receitas = [];

let modoEdicao = false;
let indexEdicao = -1;

// Referências aos elementos
const formReceita = document.getElementById('form-receita');
const formBusca = document.getElementById('form-busca');
const resultados = document.getElementById('resultados');

// Cadastrar ou atualizar receita
formReceita.addEventListener('submit', function (event) {
  event.preventDefault();

  const titulo = document.getElementById('titulo').value;
  const ingredientes = document.getElementById('ingredientes').value.toLowerCase().split(',').map(i => i.trim());
  const tempo = document.getElementById('tempo').value;

  const novaReceita = new Receita(titulo, ingredientes, tempo);

  if (modoEdicao) {
    receitas[indexEdicao] = novaReceita;
    modoEdicao = false;
    indexEdicao = -1;
  } else {
    receitas.push(novaReceita);
  }

  formReceita.reset();
  atualizarLista();
});

// Buscar por ingrediente
formBusca.addEventListener('submit', function (event) {
  event.preventDefault();
  const termo = document.getElementById('busca-ingrediente').value.toLowerCase().trim();
  const filtradas = receitas.filter(r => r.ingredientes.includes(termo));

  exibirReceitas(filtradas, true);
  formBusca.reset();
});

// Atualiza a lista completa
function atualizarLista() {
  exibirReceitas(receitas, false);
}

// Exibe receitas no DOM
function exibirReceitas(lista, isBusca) {
  resultados.innerHTML = "";

  if (lista.length === 0) {
    resultados.innerHTML = "<p>Nenhuma receita encontrada.</p>";
    return;
  }

  lista.forEach((receita, index) => {
    const div = document.createElement("div");
    div.className = "receita";
    div.innerHTML = `
      <strong>${receita.titulo}</strong><br>
      <em>Ingredientes:</em> ${receita.ingredientes.join(', ')}<br>
      <em>Tempo:</em> ${receita.tempo} minutos<br>
      <button onclick="editarReceita(${index})">Editar</button>
      <button onclick="excluirReceita(${index})">Excluir</button>
    `;

    resultados.appendChild(div);
  });
}

// Editar receita
window.editarReceita = function (index) {
  const receita = receitas[index];

  document.getElementById('titulo').value = receita.titulo;
  document.getElementById('ingredientes').value = receita.ingredientes.join(', ');
  document.getElementById('tempo').value = receita.tempo;

  modoEdicao = true;
  indexEdicao = index;
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// Excluir receita
window.excluirReceita = function (index) {
  if (confirm("Deseja excluir esta receita?")) {
    receitas.splice(index, 1);
    atualizarLista();
  }
};

// Inicializar lista vazia
atualizarLista();
