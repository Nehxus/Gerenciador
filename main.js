// Seleciona os elementos necessários
let sliderElement = document.querySelector("#slider"); // Seleciona o elemento com o id "slider"
let buttonElement = document.querySelector("#button"); // Seleciona o elemento com o id "button"
let tamanhoDaSenha = document.querySelector("#valor"); // Seleciona o elemento com o id "valor"
let Senha = document.querySelector("#password"); // Seleciona o elemento com o id "password"
let containerPalavraChave = document.querySelector("#containerPalavraChave"); // Seleciona o elemento com o id "containerPalavraChave"
let letrasNumeCaracEsp = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!/!@#$%&*()_'; // String contendo caracteres para gerar senhas
let novaSenha = ''; // Variável para armazenar a nova senha gerada

tamanhoDaSenha.innerHTML = sliderElement.value; // Define o conteúdo do elemento com id "valor" como o valor inicial do elemento com id "slider"

// Atualiza o valor do span ao mudar o input range
sliderElement.oninput = function() {
  tamanhoDaSenha.innerHTML = this.value; // Atualiza o conteúdo do elemento com id "valor" quando o valor do elemento com id "slider" muda
}

function gerarSenha() {
  let SenhaGerada = '';
  for(let i = 0, n = letrasNumeCaracEsp.length; i < sliderElement.value; ++i) {
    SenhaGerada += letrasNumeCaracEsp.charAt(Math.floor(Math.random() * n)); // Gera uma senha aleatória com base nos caracteres disponíveis
  }
  containerPalavraChave.classList.remove("hide"); // Remove a classe "hide" do elemento com id "containerPalavraChave"
  Senha.innerHTML = SenhaGerada; // Define o conteúdo do elemento com id "password" como a senha gerada
  novaSenha = SenhaGerada; // Atribui a senha gerada à variável novaSenha
}

function copyPassword() {
  navigator.clipboard.writeText(novaSenha).then(() => {
    alert('Senha copiada para a área de transferência!'); // Copia a senha gerada para a área de transferência
  });
}

const inputTarefa = document.querySelector('.input-tarefa'); // Seleciona o elemento com a classe "input-tarefa"
const btnTarefa = document.querySelector('.btn-add'); // Seleciona o elemento com a classe "btn-add"
const tarefas = document.querySelector('.senhas'); // Seleciona o elemento com a classe "senhas"
const inputSenha = document.querySelector('.inputSenha'); // Seleciona o elemento com a classe "inputSenha"

// Adiciona um ouvinte de evento para o clique no botão de adicionar tarefa
btnTarefa.addEventListener('click', () => {
  if (!inputTarefa.value || !inputSenha.value) return alert("Todos os campos devem estar preenchidos"); // Verifica se ambos os campos estão preenchidos
  criaTarefa(inputTarefa.value, inputSenha.value); // Cria uma nova tarefa com o texto e a senha fornecidos
});

// Adiciona um ouvinte de evento para a tecla "Enter" no campo de entrada da tarefa
inputTarefa.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && inputTarefa.value && inputSenha.value) {
    criaTarefa(inputTarefa.value, inputSenha.value); // Cria uma nova tarefa quando a tecla "Enter" é pressionada e ambos os campos estão preenchidos
  }
});

// Função para criar um elemento <li>
function criaLi() {
  return document.createElement('li');
}

// Função para criar um elemento <p>
function criaP() {
  return document.createElement('p');
}

// Limpa os campos de entrada
function limpaInput() {
  inputTarefa.value = '';
  inputSenha.value = '';
  inputTarefa.focus();
}

// Cria uma nova tarefa com texto e senha fornecidos
function criaTarefa(textoInput, senhaInput) {
  const li = criaLi();
  const p = criaP();
  p.innerText = senhaInput; // Define o texto do parágrafo como a senha fornecida
  li.classList.add('senhasLi'); // Adiciona a classe "senhasLi" ao elemento <li>
  li.innerText = textoInput; // Define o texto do elemento <li> como o texto fornecido
  li.appendChild(p); // Adiciona o parágrafo como filho do elemento <li>
  tarefas.appendChild(li); // Adiciona o elemento <li> à lista de tarefas
  limpaInput(); // Limpa os campos de entrada
  criaBotaoApagar(li); // Cria o botão de apagar para a tarefa
  salvarTarefas(); // Salva as tarefas no armazenamento local
}

// Cria o botão de apagar para uma tarefa
function criaBotaoApagar(li) {
  const botaoApagar = document.createElement('button');
  botaoApagar.innerText = 'Apagar'; // Define o texto do botão como "Apagar"
  botaoApagar.classList.add('Apagar'); // Adiciona a classe "Apagar" ao botão
  li.appendChild(botaoApagar); // Adiciona o botão como filho do elemento <li>
}

// Remove uma tarefa ao clicar no botão de apagar
document.addEventListener('click', (e) => {
  const el = e.target;
  if (el.classList.contains('Apagar')) {
    el.parentElement.remove(); // Remove o elemento pai do botão (o elemento <li>)
    salvarTarefas(); // Salva as tarefas atualizadas no armazenamento local
  }
});

// Salva as tarefas na memória local
function salvarTarefas() {
  const liTarefas = tarefas.querySelectorAll('li');
  const listaDeTarefas = Array.from(liTarefas).map((tarefa) => ({
    nome: tarefa.firstChild.nodeValue.trim(), // Obtém o nome da tarefa
    senha: tarefa.querySelector('p').innerText.trim() // Obtém a senha da tarefa
  }));
  const tarefasJSON = JSON.stringify(listaDeTarefas); // Converte a lista de tarefas para formato JSON
  localStorage.setItem('tarefas', tarefasJSON); // Armazena as tarefas no armazenamento local com a chave 'tarefas'
}

// Função para adicionar tarefas salvas ao carregar a página
function adicionaTarefasSalvas() {
  const tarefasJSON = localStorage.getItem('tarefas'); // Obtém as tarefas armazenadas no armazenamento local com a chave 'tarefas'
  const listaDeTarefas = JSON.parse(tarefasJSON) || []; // Converte as tarefas de formato JSON para um array ou define um array vazio caso não haja tarefas
  listaDeTarefas.forEach((tarefa) => criaTarefa(tarefa.nome, tarefa.senha)); // Para cada tarefa na lista de tarefas, chama a função criaTarefa para criar a tarefa na interface
}

// Função para exibir ou ocultar o container
function Exibir() {
  const containerExibir = document.querySelector('.container'); // Seleciona o elemento com a classe "container"
  containerExibir.classList.toggle('hide'); // Adiciona ou remove a classe "hide" do elemento selecionado, alternando a exibição do container
}

// Chamada para adicionar tarefas salvas ao carregar a página
adicionaTarefasSalvas();