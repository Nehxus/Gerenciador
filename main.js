// Seleciona os elementos necessários
let sliderElement = document.querySelector("#slider");
let buttonElement = document.querySelector("#button");
let tamanhoDaSenha = document.querySelector("#valor");
let Senha = document.querySelector("#password");
let containerPalavraChave = document.querySelector("#containerPalavraChave");
//string com alfabeto maiusculo,minusculo,numeros e caracteres especiais.
let letrasNumeCaracEsp = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!/!@#$%&*()_';
//inicializa a variavel em vazio.
let novaSenha = '';
//atualiza o span tamanho senha, quando o usuario arrasta o slider
tamanhoDaSenha.innerHTML = sliderElement.value;

// Atualiza o valor do span ao mudar o input range
sliderElement.oninput = function() {
  tamanhoDaSenha.innerHTML = this.value;
}

function gerarSenha() {
  let SenhaGerada = '';
  for(let i = 0; i < sliderElement.value; ++i) {
    SenhaGerada += letrasNumeCaracEsp.charAt(Math.floor(Math.random() *  letrasNumeCaracEsp.length));
  }
  //remove a classe hide do container palavra chave para exibir na tela.
  containerPalavraChave.classList.remove("hide");
  Senha.innerHTML = SenhaGerada;
  novaSenha = SenhaGerada;
}
//ao clicar na sennha, é copiada a senha para area de transferencia
function copyPassword() {
  navigator.clipboard.writeText(novaSenha);
  alert('Senha copiada para a área de transferência!');
}
