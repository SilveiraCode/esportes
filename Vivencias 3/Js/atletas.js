// JS
const form = document.getElementById("formAtleta");
const lista = document.getElementById("lista");
const mensagem = document.getElementById("mensagem");

// Função para listar atletas
function listaratletas() {
  fetch("http://localhost:8080/atletas")
    .then(res => res.json())
    .then(data => {
      lista.innerHTML = "";
      if (data.length === 0) {
        lista.innerHTML = "<li>Nenhum atleta cadastrado</li>";
      } else {
        data.forEach(atleta => {
          const li = document.createElement("li");
          li.textContent = `${atleta.nome} ${atleta.sobrenome} - Idade: ${atleta.idade}`;
          lista.appendChild(li);
        });
      }
    })
    .catch(err => {
      mensagem.textContent = "Erro ao carregar atletas.";
      mensagem.style.color = "red";
      console.error(err);
    });
}

// Função para cadastrar atleta
function cadastroatletas(atleta) {
  fetch("http://localhost:8080/atletas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(atleta)
  })
  .then(res => {
    if (!res.ok) throw new Error("Erro na requisição");
    return res.json();
  })
  .then(data => {
    mensagem.textContent = `Atleta ${data.nome} cadastrado com sucesso!`;
    mensagem.style.color = "green";
    listaratletas();
    form.reset();
  })
  .catch(err => {
    mensagem.textContent = "Erro ao cadastrar atleta.";
    mensagem.style.color = "red";
    console.error(err);
  });
}

// Evento do formulário
form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const atleta = {
    nome: document.getElementById("nome").value,
    sobrenome: document.getElementById("sobrenome").value,
    idade: parseInt(document.getElementById("idade").value)
  };

  cadastroatletas(atleta);
});

// Lista atletas ao carregar a página
listaratletas();
