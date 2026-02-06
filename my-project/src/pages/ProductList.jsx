import { useEffect, useState } from "react";

function ProductList() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/produtos")
      .then((res) => res.json())
      .then((data) => setProdutos(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="flex justify-center px-6 py-10 mt-16">
    <div className="w-full max-w-5xl space-y-6">
        {produtos.map((produto) => (
          <div
            key={produto.id}
            className="bg-green-900/80 text-white rounded-2xl px-8 py-6 grid grid-cols-1 md:grid-cols-3 gap-8 shadow-lg"
          >
            <div className="space-y-2">
              <p className="font-bold">
                Nome:{" "}
                <span className="font-normal">
                  {produto.titulo || "Sem título"}
                </span>
              </p>

              {produto.descricao && (
                <p className="text-sm leading-relaxed">
                  <span className="font-bold">Descrição:</span>{" "}
                  {produto.descricao}
                </p>
              )}

              <p className="font-semibold">
                Valor: R$ {Number(produto.valor || 0).toFixed(2)}
              </p>
            </div>

            <div className="flex flex-col justify-center gap-1 text-sm">
              <p className="font-bold">Categoria:</p>
              <p>{produto.tipo}</p>
            </div>

            <div className="flex items-center justify-between md:justify-end gap-6">
              <div className="text-sm">
                <p className="font-bold">Status:</p>
                <p>{produto.status}</p>
              </div>

              <div className="flex flex-col gap-4 text-xl">
                <button className="text-yellow-400 hover:scale-110 transition">
                  ✏️
                </button>
                <button className="text-red-500 hover:scale-110 transition">
                  🗑️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
