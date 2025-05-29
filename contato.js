(function () {
  emailjs.init("4zaU5iwJQ3f5Qn8yX");
})();
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formulario");
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();

    if (!nome || !email || !mensagem) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    emailjs.sendForm("service_2gkoqw7", "template_w09eyiy", this).then(
      function () {
        const mensagemSucesso = document.getElementById("mensagem-sucesso");

        document.getElementById("mensagem-sucesso").style.display = "block";

        document.getElementById("formulario").reset();

        setTimeout(() => {
          mensagemSucesso.style.display = "none";
        }, 3000);
      },
      function (error) {
        console.log("Erro ao enviar o email: ", error);
      }
    );
  });
});
