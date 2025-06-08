async function registrar(event) { 
  event.preventDefault();
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const telefone = document.getElementById("telefone").value;
  const cpf = document.getElementById("cpf").value;
  const senha = document.getElementById("senha").value;
  const confirmarSenha = document.getElementById("confirmarSenha").value;
  const msg = document.getElementById("msg-erro");

  console.log("Registrando usuário:")

  if (senha !== confirmarSenha) {
    msg.innerText = "As senhas não coincidem.";
    return;
  }

  try {
    const res = await fetch("/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, telefone, cpf, senha }),
    });

    const data = await res.json();
    msg.innerText = data.message || data.error;

    if (res.ok) {
      setTimeout(() => {
        window.location.href = "/login.html";
      }, 1500);
    }
  } catch (err) {
    console.error("Erro ao registrar:", err);
    msg.innerText = "Erro ao se comunicar com o servidor";
  }
}
