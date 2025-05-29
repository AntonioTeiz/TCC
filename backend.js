let db;
const DB_KEY = "meu_banco_sqlite";

async function initDB() {
  const SQL = await initSqlJs({
    locateFile: (file) =>
      `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.6.2/${file}`,
  });

  const saved = localStorage.getItem(DB_KEY);
  if (saved) {
    const binaryArray = new Uint8Array(JSON.parse(saved));
    db = new SQL.Database(binaryArray);
  } else {
    db = new SQL.Database();
    db.run("CREATE TABLE usuarios (id INTEGER PRIMARY KEY, nome TEXT);");
    saveDB();
  }
}

function saveDB() {
  const data = db.export();
  localStorage.setItem(DB_KEY, JSON.stringify(Array.from(data)));
}

function addUser() {
  const nome = prompt("Digite o nome do usuário:");
  if (!nome) return;

  db.run("INSERT INTO usuarios (nome) VALUES (?);", [nome]);
  saveDB();
  const msg = document.getElementById("msg-sucesso");
  msg.style.display = "block";
  setTimeout(() => {
    msg.style.display = "none";
  }, 3000);
}

initDB().then(() => {
  document.getElementById("addUser").addEventListener("click", addUser);
});
