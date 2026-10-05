const formLogin = document.getElementById("form-login");
const campoUsuario = document.getElementById("usuario");
const campoSenha = document.getElementById("senha");
const botaoOlho = document.getElementById("alternar-senha");
const mensagemErro = document.getElementById("login-erro");

function mostrarErro(texto) {
  mensagemErro.textContent = texto;
  mensagemErro.hidden = false;
}

function limparErro() {
  mensagemErro.hidden = true;
  mensagemErro.textContent = "";
}

botaoOlho.addEventListener("click", function () {
  const visivel = campoSenha.type === "text";
  campoSenha.type = visivel ? "password" : "text";
  botaoOlho.textContent = visivel ? "Mostrar" : "Ocultar";
  botaoOlho.setAttribute("aria-label", visivel ? "Mostrar senha" : "Ocultar senha");
  botaoOlho.setAttribute("aria-pressed", String(!visivel));
});

campoUsuario.addEventListener("input", limparErro);
campoSenha.addEventListener("input", limparErro);

formLogin.addEventListener("submit", function (evento) {
  evento.preventDefault();
  limparErro();

  const usuario = campoUsuario.value;
  const senha = campoSenha.value;

  if (!usuario.trim()) {
    mostrarErro("Informe o usuário.");
    campoUsuario.focus();
    return;
  }
  if (!senha) {
    mostrarErro("Informe a senha.");
    campoSenha.focus();
    return;
  }

  const sessao = Auth.entrar(usuario, senha);
  if (!sessao) {
    mostrarErro("Usuário ou senha incorretos. Confira os dados e tente de novo.");
    campoSenha.value = "";
    campoSenha.focus();
    return;
  }

  window.location.replace("index.html");
});

campoUsuario.focus();
