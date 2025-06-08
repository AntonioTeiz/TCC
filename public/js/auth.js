document.addEventListener("DOMContentLoaded", function () {
  const authButton = document.getElementById("auth-button");
  if (!authButton) return;

  if (localStorage.getItem("usuario_logado") === "true") {
    let nome = localStorage.getItem("nome_usuario") || "";
    let primeiroNome = nome.split(" ")[0];
    authButton.textContent = `Olá, ${primeiroNome} | Sair`;
    authButton.href = "#";
    authButton.onclick = function (e) {
      e.preventDefault();
      localStorage.removeItem("usuario_logado");
      localStorage.removeItem("nome_usuario");
      window.location.reload();
    };
  } else {
    authButton.textContent = "Entrar";
    authButton.href = "login.html";
    authButton.onclick = null;
  }
});

