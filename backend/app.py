from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)

# Configuração do banco
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

# Modelo (tabela)
class Produto(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    preco = db.Column(db.Float, nullable=False)

# Criar o banco
with app.app_context():
    db.create_all()

# GET - listar produtos
@app.route("/produtos", methods=["GET"])
def listar_produtos():
    produtos = Produto.query.all()
    lista = []

    for p in produtos:
        lista.append({
            "id": p.id,
            "nome": p.nome,
            "preco": p.preco
        })

    return jsonify(lista)

# POST - cadastrar produto
@app.route("/produtos", methods=["POST"])
def criar_produto():
    dados = request.json

    novo_produto = Produto(
        nome=dados["nome"],
        preco=dados["preco"]
    )

    db.session.add(novo_produto)
    db.session.commit()

    return jsonify({"mensagem": "Produto cadastrado com sucesso"}), 201

app.run(debug=True)
