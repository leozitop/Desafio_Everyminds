const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

const db = new sqlite3.Database('./NunesSports.db', (err) => {
  if (err) {
    console.error('Erro ao abrir o banco de dados', err.message);
  } else {
    console.log('Conectado ao banco de dados');
  }
});

app.use(express.json());

app.get('/api/produtos', (req, res) => {
  db.all('SELECT * FROM produtos', (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Erro ao buscar produtos' });
    } else {
      res.json(rows);
    }
  });
});

app.post('/api/produtos', (req, res) => {
  const { nome, codigo, descricao, preco } = req.body;
  db.run('INSERT INTO produtos (nome, codigo, descricao, preco) VALUES (?, ?, ?, ?)',
    [nome, codigo, descricao, preco],
    (err) => {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao adicionar produto' });
      } else {
        res.json({ message: 'Produto adicionado com sucesso' });
      }
    });
});

app.put('/api/produtos/:id', (req, res) => {
  const { nome, codigo, descricao, preco } = req.body;
  const id = req.params.id;
  db.run('UPDATE produtos SET nome=?, codigo=?, descricao=?, preco=? WHERE id=?',
    [nome, codigo, descricao, preco, id],
    (err) => {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao atualizar produto' });
      } else {
        res.json({ message: 'Produto atualizado com sucesso' });
      }
    });
});

app.delete('/api/produtos/:id', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM produtos WHERE id=?', [id], (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Erro ao excluir produto' });
    } else {
      res.json({ message: 'Produto excluído com sucesso' });
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});