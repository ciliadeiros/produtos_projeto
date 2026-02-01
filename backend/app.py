from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

arquivo_json = "produtos.json"

# funções básicas (listar e salvar produtos)
def ler_produtos():
    if not os.path.exists(arquivo_json):
        return []
    with open(arquivo_json, "r", encoding="utf-8") as f:
        return json.load(f)

def salvar_produtos(produtos):
    with open(arquivo_json, "w", encoding="utf-8") as f:
        json.dump(produtos, f, ensure_ascii=False, indent=2)

class Produto(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(150), nullable=False)
    tipo = db.Column(db.String(50), nullable=False)
    status = db.Column(db.String(20), nullable=False)
    descricao = db.Column(db.String(255))
    valor = db.Column(db.Float, nullable=False)

# Criar o banco
with app.app_context():
    db.create_all()

# Rota: lista os produtos
@app.route("/produtos", methods=["GET"])
def listar_produtos():
    return jsonify(ler_produtos()), 200

# Rota: cria um produto
@app.route("/produtos", methods=["POST"])
def criar_produto():
    produtos = ler_produtos()
    dados = request.get_json()

    if not dados:
        return jsonify({"erro": "json não enviado"}), 400

    # O id do novo produto 
    novo_id = len(produtos) + 1

    novo_produto = {"id": novo_id, "titulo": dados["titulo"], "tipo": dados["tipo"],
    "status": dados["status"],"valor": dados["valor"]}

    produtos.append(novo_produto)
    salvar_produtos(produtos)

    return jsonify(novo_produto), 201

# Rota: edição as informações do produto
@app.route("/produtos/<int:id>", methods=["PUT"])
def editar_produto(id):
    return jsonify({"msg": f"editar produto {id}"}), 200


# Rota: editar apenas status do produto
@app.route("/produtos/<int:id>/status", methods=["PATCH"])
def alterar_status_produto(id):
    # TODO: alterar status
    return jsonify({"msg": f"alterar status do produto {id}"}), 200


# Rota: deleta produto
@app.route("/produtos/<int:id>", methods=["DELETE"])
def deletar_produto(id):
    return jsonify({"msg": f"deletar produto {id}"}), 200


if __name__ == "__main__":
    app.run(debug=True)
