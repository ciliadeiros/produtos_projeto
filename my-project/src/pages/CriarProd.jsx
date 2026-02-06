import { useState } from "react";

function CadastrarProduto() {
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    categoria: "Alimento",
    valor: ""
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const produto = {
      titulo: form.nome,
      tipo: form.categoria,
      status: "Disponível",
      valor: form.valor
    };

    await fetch("http://localhost:5000/criar_produtos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(produto)
    });

    alert("Produto cadastrado com sucesso!");
  }

  return (
    <div className="flex items-center justify-center py-20">
      <div className="bg-green-900/90 p-8 rounded-xl w-full max-w-3xl">
        <form
          onSubmit={handleSubmit}
          className="space-y-6 flex flex-col gap-4"
        >
          <h1 className="text-white text-4xl font-bold text-center">
            CADASTRAR PRODUTO
          </h1>

          <input
            name="nome"
            placeholder="Nome do produto"
            onChange={handleChange}
            className="w-full p-4 rounded-lg bg-white h-[40px]"
          />

          <input
            name="descricao"
            placeholder="Descrição"
            onChange={handleChange}
            className="w-full p-4 rounded-lg bg-white h-[40px]"
          />

          <div className="flex gap-4">
            <select
              name="categoria"
              onChange={handleChange}
              className="w-1/2 p-4 rounded-lg bg-white h-[40px]"
            >
              <option>Alimento</option>
              <option>Limpeza</option>
              <option>Higiene</option>
              <option>Outro</option>
            </select>

            <input
              name="valor"
              type="number"
              placeholder="Valor"
              onChange={handleChange}
              className="w-1/2 p-4 rounded-lg bg-white h-[40px]"
            />
          </div>

          <button
            type="submit"
            className="bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-600 transition self-end w-[200px] h-[40px]"
          >
            ADICIONAR PRODUTO +
          </button>
        </form>
      </div>
    </div>
  );
}

export default CadastrarProduto;
