const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const sqlite3 = require("sqlite3").verbose();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

const db = new sqlite3.Database("./database.db");

db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    email TEXT UNIQUE,
    telefone TEXT,
    cpf TEXT,
    senha TEXT
  )
`);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/register", async (req, res) => {
  const { nome, email, telefone, cpf, senha } = req.body;
  const hash = await bcrypt.hash(senha, 10);
  console.log("requisição de registro recebida:", req.body);
  db.run(
    `INSERT INTO users (nome, email, telefone, cpf, senha) VALUES (?, ?, ?, ?, ?)`,
    [nome, email, telefone, cpf, hash],
    function (err) {
      if (err)
        return res.status(400).json({
          error: "Erro ao registrar. Email pode já estar cadastrado.",
        });
      res.json({ message: "Registro feito com sucesso!" });
    }
  );
});

app.post("/login", (req, res) => {
  const { email, senha } = req.body;
  console.log("requisição de registro recebida:", req.body);
  db.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
    if (err || !user)
      return res.status(401).json({ error: "Usuário não encontrado" });

    const match = await bcrypt.compare(senha, user.senha);
    if (!match) return res.status(401).json({ error: "Senha incorreta" });

    res.json({ message: "Login bem-sucedido", nome: user.nome });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
