import { useEffect, useState } from "react";

function App() {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");

  // GET
  useEffect(() => {
    fetch("http://localhost:5000/produtos")
      .then(res => res.json())
      .then(data => setProdutos(data));
  }, []);

  // POST
  function cadastrarProduto() {
    fetch("http://localhost:5000/criar_produtos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nome: nome,
        preco: preco
      })
    }).then(() => {
      alert("Produto cadastrado!");
    });
  }

  return (
    <div>
      <h1>Loja</h1>

      <input
        placeholder="Nome"
        onChange={e => setNome(e.target.value)}
      />
      <input
        placeholder="Preço"
        onChange={e => setPreco(e.target.value)}
      />
      <button onClick={cadastrarProduto}>
        Cadastrar
      </button>

      <ul>
        {produtos.map(p => (
          <li key={p.id}>
            {p.nome} - R$ {p.preco}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
