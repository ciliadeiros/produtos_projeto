import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditarProd() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    titulo: "",
    tipo: "Alimento",
    status: "Ativo",
    descricao: "",
    valor: ""
  });

  useEffect(() => {
    fetch(`http://localhost:5000/produtos/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setForm({
          titulo: data.titulo || "",
          tipo: data.tipo || "Alimento",
          status: data.status || "Ativo",
          descricao: data.descricao || "",
          valor: data.valor ?? ""
        });
      });
  }, [id]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await fetch(`http://localhost:5000/produtos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        valor: Number(form.valor)
      })
    });

    alert("Produto atualizado com sucesso!");
    navigate("/");
  }

  return (
    <div className="flex items-center justify-center py-20">
      <div className="bg-green-900/90 p-8 rounded-xl w-full max-w-3xl">
        <form
          onSubmit={handleSubmit}
          className="space-y-6 flex flex-col gap-4"
        >
          <h1 className="text-white text-4xl font-bold text-center">
            EDITAR PRODUTO
          </h1>

          <input
            name="titulo"
            placeholder="Nome do produto"
            value={form.titulo}
            onChange={handleChange}
            className="w-full p-4 rounded-lg bg-white h-[40px]"
          />

          <input
            name="descricao"
            placeholder="Descrição"
            value={form.descricao}
            onChange={handleChange}
            className="w-full p-4 rounded-lg bg-white h-[40px]"
          />

          <div className="flex gap-4">
            <select
              name="tipo"
              value={form.tipo}
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
              value={form.valor}
              onChange={handleChange}
              className="w-1/2 p-4 rounded-lg bg-white h-[40px]"
            />
          </div>

          <button
            type="submit"
            className="bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-600 transition self-end w-[200px] h-[40px]"
          >
            SALVAR
          </button>
        </form>
      </div>
    </div>
  );
}
