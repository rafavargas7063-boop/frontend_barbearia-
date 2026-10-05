(function () {
  const sessao = Auth.lerSessao();
  if (!sessao) return;

  document.getElementById("usuario-logado").textContent = "Olá, " + sessao.nome;

  const campoProfissional = document.getElementById("profissional");
  const formAgendamento = document.getElementById("form-agendamento");

  function preselecionarProfissional() {
    if (sessao.profissional) {
      campoProfissional.value = sessao.profissional;
    }
  }

  preselecionarProfissional();

  formAgendamento.addEventListener("submit", function () {
    setTimeout(preselecionarProfissional, 0);
  });

  document.getElementById("botao-sair").addEventListener("click", Auth.sair);
})();
