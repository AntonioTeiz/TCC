const images = [
  "fotos/img1.jpg",
  "fotos/img2.png",
  "fotos/img3.png",
  "fotos/modelo6.png",
  "fotos/img5.png",
  "fotos/img6.png",
  "fotos/img7.png",
  "fotos/modelo10.png",
  "fotos/modelo3.png",
];
let currentIndex = 0;

function updateImages() {
  const gallery = document.getElementById("galeria");
  if (gallery) {
    gallery.innerHTML = "";
    for (let i = 0; i < 6; i++) {
      const img = document.createElement("img");
      const index = (currentIndex + i) % images.length;
      img.src = images[index];
      img.style.borderRadius = "10px";
      img.style.width = "500px";
      img.style.height = "600px";
      img.style.margin = "5px";
      gallery.appendChild(img);
    }
  } else {
    console.error("Elemento com ID 'galeria' não encontrado no DOM.");
  }
}

function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  updateImages();
}

setInterval(function () {
  nextImage();
}, 5000);

document.addEventListener("DOMContentLoaded", function () {
  updateImages();
});

const form = document.querySelector(".contato-form");
const mensagem = document.getElementById("mensagem-sucesso");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  mensagem.style.display = "block";

  form.reset();

  setTimeout(() => {
    mensagem.style.display = "none";
  }, 2000);
});
