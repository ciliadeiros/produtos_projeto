import produtos from "../produtos.json";
import { Link } from "react-router-dom";

function ProductList() {
  return (
    <ul style={{ listStyleType: "none", padding: 0, display: "grid", gap: "12px" }}>
      {produtos.map((produto) => (
        <li
          key={produto.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: 8,
            padding: 12,
            position: "relative",
          }}
        >
          <button
            type="button"
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              border: "1px solid #e55",
              background: "#fff",
              color: "#c00",
              borderRadius: 6,
              padding: "4px 8px",
              cursor: "pointer",
            }}
          >
            Deletar
          </button>

          <h3 style={{ margin: "0 0 6px" }}>{produto.titulo}</h3>
          <p style={{ margin: "0 0 4px" }}>
            <strong>Tipo:</strong> {produto.tipo}
          </p>
          <p style={{ margin: "0 0 4px" }}>
            <strong>Status:</strong> {produto.status}
          </p>
          <p style={{ margin: "0 0 8px" }}>{produto.descricao}</p>
          <p style={{ margin: 0 }}>
            <strong>Preço:</strong> R$ {produto.valor.toFixed(2)}
          </p>
          <Link to={`/editar/${produto.id}`}>Editar</Link>
        </li>
      ))}
    </ul>
  );
}

export default ProductList;
