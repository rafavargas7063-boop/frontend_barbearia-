# Barbearia Alameda — Painel de Agendamentos

Projeto acadêmico de Desenvolvimento Front-End (Sistema Empresarial).
Painel para o barbeiro cadastrar clientes, acompanhar o andamento dos atendimentos e ver o faturamento do dia.

## Funcionalidades

- **Login** com usuário e senha antes de acessar o painel
- **Novo agendamento** com cliente, serviço, horário e profissional
- **Quadro de andamento** em três colunas: Agendado, Em atendimento e Concluído
- **Resumo do dia** com total de agendamentos, em atendimento, concluídos e faturamento
- **Sair** para encerrar a sessão

## Como executar

1. Baixe ou clone o projeto.
2. Abra o arquivo `login.html` no navegador.
3. Entre com uma das contas abaixo.

Não é necessário instalar nada nem usar servidor.

## Contas de demonstração

| Usuário | Senha |
|---|---|
| marcos | marcos123 |
| diego | diego123 |
| juliana | juliana123 |
| admin | admin123 |

## Estrutura de arquivos

| Arquivo | Função |
|---|---|
| `login.html`, `login.css`, `login.js` | Tela de login |
| `auth.js` | Usuários e controle de sessão |
| `index.html`, `style.css`, `script.js` | Painel de agendamentos |
| `sessao.js` | Mostra o usuário logado e o botão Sair no painel |

## Como funciona o login

1. Em `login.html`, o usuário informa usuário e senha.
2. Se estiverem corretos, a sessão é salva no `sessionStorage` e o usuário vai para `index.html`.
3. Se alguém abrir `index.html` sem estar logado, volta para `login.html`.
4. O botão **Sair** apaga a sessão e volta ao login.

## Observações

- Os dados (agendamentos e sessão) existem apenas enquanto a aba do navegador está aberta. Não há banco de dados nem `localStorage`.
- O login é uma simulação para fins didáticos: as senhas ficam no `auth.js`. Em um sistema real, a validação deve ser feita no servidor.

## Tecnologias

HTML, CSS e JavaScript puro.
