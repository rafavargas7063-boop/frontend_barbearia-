const Auth = (function () {
  const CHAVE_SESSAO = "barbearia-alameda-sessao";

  const USUARIOS = [
    { usuario: "marcos",  senha: "marcos123",  nome: "Marcos",        profissional: "Marcos" },
    { usuario: "diego",   senha: "diego123",   nome: "Diego",         profissional: "Diego" },
    { usuario: "juliana", senha: "juliana123", nome: "Juliana",       profissional: "Juliana" },
    { usuario: "admin",   senha: "admin123",   nome: "Administrador", profissional: "" },
  ];

  function lerSessao() {
    try {
      const bruto = sessionStorage.getItem(CHAVE_SESSAO);
      return bruto ? JSON.parse(bruto) : null;
    } catch (erro) {
      return null;
    }
  }

  function entrar(usuario, senha) {
    const login = usuario.trim().toLowerCase();
    const encontrado = USUARIOS.find(
      (item) => item.usuario === login && item.senha === senha
    );
    if (!encontrado) return null;

    const sessao = {
      usuario: encontrado.usuario,
      nome: encontrado.nome,
      profissional: encontrado.profissional,
    };
    try {
      sessionStorage.setItem(CHAVE_SESSAO, JSON.stringify(sessao));
    } catch (erro) {
      return null;
    }
    return sessao;
  }

  function sair() {
    try {
      sessionStorage.removeItem(CHAVE_SESSAO);
    } catch (erro) {
      /* sem ação */
    }
    window.location.replace("login.html");
  }

  function exigirLogin() {
    if (!lerSessao()) {
      window.location.replace("login.html");
    }
  }

  function redirecionarSeLogado() {
    if (lerSessao()) {
      window.location.replace("index.html");
    }
  }

  return { entrar, sair, lerSessao, exigirLogin, redirecionarSeLogado };
})();
