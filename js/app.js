const contatos = [];

const app = document.querySelector("#app");
const botoesMenu = document.querySelectorAll("nav button");

function marcarMenuAtivo(rota) {
  botoesMenu.forEach(botao => {
    botao.classList.toggle("ativo", botao.dataset.rota === rota);
  });
}

function irPara(rota) {
  marcarMenuAtivo(rota);

  if (rota === "inicio") mostrarInicio();
  if (rota === "cadastro") mostrarCadastro();
  if (rota === "lista") mostrarLista();
  if (rota === "sobre") mostrarSobre();
}

function mostrarInicio() {
  app.innerHTML = `
    <h1>Agenda de Contatos</h1>
    <p>
      Este é um exemplo simples de SPA feita com HTML, CSS e JavaScript.
      A navegação acontece sem recarregar a página.
    </p>

    <p>
      Os contatos cadastrados ficam temporariamente guardados em um array JavaScript.
    </p>

    <div class="contador">
      Contatos cadastrados nesta sessão: <strong>${contatos.length}</strong>
    </div>

    <div class="acoes">
      <button class="botao" id="btnCadastrar">Cadastrar contato</button>
      <button class="botao secundario" id="btnVerContatos">Ver contatos</button>
    </div>
  `;

  document.querySelector("#btnCadastrar")
    .addEventListener("click", () => irPara("cadastro"));

  document.querySelector("#btnVerContatos")
    .addEventListener("click", () => irPara("lista"));
}

function mostrarCadastro() {
  app.innerHTML = `
    <h1>Cadastrar Contato</h1>

    <form id="formContato">
      <div class="campo">
        <label for="nome">Nome</label>
        <input id="nome" type="text" placeholder="Digite o nome do contato" required>
      </div>

      <div class="campo">
        <label for="telefone">Telefone</label>
        <input id="telefone" type="text" placeholder="Digite o telefone" required>
      </div>

      <div class="campo">
        <label for="email">E-mail</label>
        <input id="email" type="email" placeholder="Digite o e-mail" required>
      </div>

      <button class="botao" type="submit">Salvar contato</button>
      <div id="mensagem"></div>
    </form>
  `;

  document.querySelector("#formContato").addEventListener("submit", function(evento) {
    evento.preventDefault();

    const nome = document.querySelector("#nome").value.trim();
    const telefone = document.querySelector("#telefone").value.trim();
    const email = document.querySelector("#email").value.trim();

    contatos.push({
      nome,
      telefone,
      email
    });

    document.querySelector("#mensagem").innerHTML =
      `<div class="mensagem">Contato cadastrado com sucesso.</div>`;

    evento.target.reset();
  });
}

function mostrarLista() {
  app.innerHTML = `
    <h1>Lista de Contatos</h1>
    <p>Esta tabela é criada dinamicamente pelo JavaScript a partir do array de contatos.</p>
    <div id="conteudoLista"></div>
  `;

  renderizarTabela();
}

function renderizarTabela() {
  const conteudo = document.querySelector("#conteudoLista");

  if (contatos.length === 0) {
    conteudo.innerHTML = `
      <div class="vazio">
        Nenhum contato cadastrado ainda.
      </div>
    `;
    return;
  }

  let linhas = "";

  contatos.forEach((contato, indice) => {
    linhas += `
      <tr>
        <td>${contato.nome}</td>
        <td>${contato.telefone}</td>
        <td>${contato.email}</td>
        <td>
          <button class="excluir" data-indice="${indice}">Excluir</button>
        </td>
      </tr>
    `;
  });

  conteudo.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Telefone</th>
          <th>E-mail</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        ${linhas}
      </tbody>
    </table>
  `;

  document.querySelectorAll(".excluir").forEach(botao => {
    botao.addEventListener("click", function() {
      const indice = Number(this.dataset.indice);
      contatos.splice(indice, 1);
      renderizarTabela();
    });
  });
}

function mostrarSobre() {
  app.innerHTML = `
    <h1>Sobre o projeto</h1>
    <p>Este exemplo foi criado para demonstrar uma Single Page Application simples.</p>
    <p>O tema escolhido foi uma agenda de contatos.</p>
    <p>O projeto demonstra cadastro em array, manipulação do DOM, eventos de clique, envio de formulário, listagem e exclusão.</p>
  `;
}

botoesMenu.forEach(botao => {
  botao.addEventListener("click", () => {
    irPara(botao.dataset.rota);
  });
});

mostrarInicio();
