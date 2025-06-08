async function login(event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  const response = await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      senha,
    }),
  });

  const data = await response.json();
  document.getElementById("mensagem").innerText = data.message || data.error;
  console.log(data);

  if (response.ok) {
    localStorage.setItem("usuario_logado", "true");
    localStorage.setItem("nome_usuario", data.nome);
    setTimeout(() => {
      window.location.href = "/index.html";
    }, 1000);
  }
}
