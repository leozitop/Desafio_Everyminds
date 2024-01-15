const novoProduto = {
  nome: 'Camiseta Esportiva',
  codigo: '001',
  descricao: 'Uma ótima camiseta para atividades esportivas.',
  preco: 29.99,
};

  
  //Create
  db.run('INSERT INTO produtos (nome, codigo, descricao, preco) VALUES (?, ?, ?, ?)',
  [novoProduto.nome, novoProduto.codigo, novoProduto.descricao, novoProduto.preco],
  function (err) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`Novo produto adicionado. ID do produto: ${this.lastID}`);
  });


  //Read
  db.all('SELECT * FROM produtos', [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Lista de produtos:');
    rows.forEach(row => {
      console.log(`${row.nome} (${row.descricao}) - Preço: ${row.preco}`);
    });
  });
  

  //Update
  const produtoAtualizado = {
    nome: 'Camiseta Esportiva Atualizada',
    codigo: '001',
    descricao: 'Nova descrição para a camiseta esportiva.',
    preco: 34.99,
  };

  db.run('UPDATE produtos SET nome=?, descricao=?, preco=? WHERE codigo=?',
    [produtoAtualizado.nome, produtoAtualizado.descricao, produtoAtualizado.preco, produtoAtualizado.codigo],
    function (err) {
      if (err) {
        return console.error(err.message);
      }
      console.log(`Produto atualizado. Linhas afetadas: ${this.changes}`);
    });
  
  
  //Delete
  const codigoParaExcluir = '001';

  db.run('DELETE FROM produtos WHERE codigo=?', [codigoParaExcluir], function (err) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`Produto excluído. Linhas afetadas: ${this.changes}`);
  });