let agendamentos = [];
let proximoId = 1;

const form = document.getElementById("form-agendamento");
const campoServico = document.getElementById("servico");

const listaAgendado = document.getElementById("lista-agendado");
const listaAtendimento = document.getElementById("lista-atendimento");
const listaConcluido = document.getElementById("lista-concluido");

const statTotal = document.getElementById("stat-total");
const statAtendimento = document.getElementById("stat-atendimento");
const statConcluidos = document.getElementById("stat-concluidos");
const statFaturamento = document.getElementById("stat-faturamento");

form.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const cliente = document.getElementById("cliente").value.trim();
  const horario = document.getElementById("horario").value;
  const profissional = document.getElementById("profissional").value;

  const opcaoServico = campoServico.options[campoServico.selectedIndex];
  const servico = opcaoServico.value;
  const preco = Number(opcaoServico.dataset.preco);

  if (!cliente || !servico || !horario || !profissional) {
    return;
  }

  const novoAgendamento = {
    id: proximoId++,
    cliente,
    servico,
    preco,
    horario,
    profissional,
    status: "agendado",
  };

  agendamentos.push(novoAgendamento);
  form.reset();
  renderizarTudo();
});

function avancarStatus(id) {
  const ordem = ["agendado", "atendimento", "concluido"];
  const agendamento = agendamentos.find((item) => item.id === id);
  if (!agendamento) return;

  const posicaoAtual = ordem.indexOf(agendamento.status);
  if (posicaoAtual < ordem.length - 1) {
    agendamento.status = ordem[posicaoAtual + 1];
  }
  renderizarTudo();
}

function voltarStatus(id) {
  const ordem = ["agendado", "atendimento", "concluido"];
  const agendamento = agendamentos.find((item) => item.id === id);
  if (!agendamento) return;

  const posicaoAtual = ordem.indexOf(agendamento.status);
  if (posicaoAtual > 0) {
    agendamento.status = ordem[posicaoAtual - 1];
  }
  renderizarTudo();
}

function removerAgendamento(id) {
  agendamentos = agendamentos.filter((item) => item.id !== id);
  renderizarTudo();
}


function criarCartao(agendamento) {
  const cartao = document.createElement("article");
  cartao.className = "card-agendamento";

  const nomeCliente = document.createElement("p");
  nomeCliente.className = "card-cliente";
  nomeCliente.textContent = agendamento.cliente;
  cartao.appendChild(nomeCliente);

  const detalheServico = document.createElement("p");
  detalheServico.className = "card-detalhe";
  detalheServico.innerHTML = `<span>${agendamento.servico}</span><span>${formatarMoeda(agendamento.preco)}</span>`;
  cartao.appendChild(detalheServico);

  const detalheHorario = document.createElement("p");
  detalheHorario.className = "card-detalhe";
  detalheHorario.innerHTML = `<span>${agendamento.horario}</span><span>${agendamento.profissional}</span>`;
  cartao.appendChild(detalheHorario);

  const acoes = document.createElement("div");
  acoes.className = "card-acoes";

  if (agendamento.status !== "agendado") {
    const botaoVoltar = document.createElement("button");
    botaoVoltar.className = "botao-acao";
    botaoVoltar.textContent = "Voltar";
    botaoVoltar.addEventListener("click", () => voltarStatus(agendamento.id));
    acoes.appendChild(botaoVoltar);
  }

  if (agendamento.status !== "concluido") {
    const rotuloAvancar =
      agendamento.status === "agendado" ? "Iniciar atendimento" : "Concluir";
    const botaoAvancar = document.createElement("button");
    botaoAvancar.className = "botao-acao";
    botaoAvancar.textContent = rotuloAvancar;
    botaoAvancar.addEventListener("click", () => avancarStatus(agendamento.id));
    acoes.appendChild(botaoAvancar);
  }

  const botaoRemover = document.createElement("button");
  botaoRemover.className = "botao-acao botao-remover";
  botaoRemover.textContent = "Remover";
  botaoRemover.addEventListener("click", () => removerAgendamento(agendamento.id));
  acoes.appendChild(botaoRemover);

  cartao.appendChild(acoes);
  return cartao;
}


function renderizarColuna(container, status, mensagemVazia) {
  container.innerHTML = "";

  const itens = agendamentos
    .filter((item) => item.status === status)
    .sort((a, b) => a.horario.localeCompare(b.horario));

  if (itens.length === 0) {
    const vazio = document.createElement("p");
    vazio.className = "coluna-vazia";
    vazio.textContent = mensagemVazia;
    container.appendChild(vazio);
    return;
  }

  itens.forEach((item) => container.appendChild(criarCartao(item)));
}


function atualizarResumo() {
  const total = agendamentos.length;
  const emAtendimento = agendamentos.filter((item) => item.status === "atendimento").length;
  const concluidos = agendamentos.filter((item) => item.status === "concluido");

  const faturamento = concluidos.reduce((soma, item) => soma + item.preco, 0);

  statTotal.textContent = total;
  statAtendimento.textContent = emAtendimento;
  statConcluidos.textContent = concluidos.length;
  statFaturamento.textContent = formatarMoeda(faturamento);
}


function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}


function renderizarTudo() {
  renderizarColuna(listaAgendado, "agendado", "Nenhum cliente agendado.");
  renderizarColuna(listaAtendimento, "atendimento", "Ninguém em atendimento.");
  renderizarColuna(listaConcluido, "concluido", "Nenhum atendimento concluído.");
  atualizarResumo();
}

renderizarTudo();