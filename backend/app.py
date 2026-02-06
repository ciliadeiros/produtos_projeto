from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'database.db')
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

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


@app.route('/')
def index():
    return "Segura essa potência"

# Listar os produtos
@app.route("/produtos", methods=["GET"])
def listar_produtos():
    return jsonify(ler_produtos()), 200

# Buscar produto por id
@app.route("/produtos/<int:id>", methods=["GET"])
def buscar_produto(id):
    produtos = ler_produtos()
    for produto in produtos:
        if produto["id"] == id:
            return jsonify(produto), 200
    return jsonify({"erro": "o produto não se encontra"}), 404

# Criar um produto
@app.route("/criar_produtos", methods=["POST"])
def criar_produto():
    produtos = ler_produtos()
    dados = request.get_json()

    if not dados:
        return jsonify({"erro": "json não enviado"}), 400

    novo_id = len(produtos) + 1

    novo_produto = {
        "id": novo_id,
        "titulo": dados["titulo"],
        "tipo": dados["tipo"],
        "status": dados["status"],
        "descricao": dados.get("descricao", ""),
        "valor": dados["valor"]
    }

    produtos.append(novo_produto)
    salvar_produtos(produtos)

    return jsonify(novo_produto), 201

# Editar as informações do produto
@app.route("/produtos/<int:id>", methods=["PUT"])
def editar_produto(id):
    with open("produtos.json") as arquivo_json:
        produtos = json.load(arquivo_json)

    dados = request.get_json()

    if not dados:
        return jsonify({"erro": "JSON não enviado"}), 400

    for produto in produtos:
        if produto["id"] == id:
            produto["titulo"] = dados.get("titulo", produto["titulo"])
            produto["tipo"] = dados.get("tipo", produto["tipo"])
            produto["status"] = dados.get("status", produto["status"])
            produto["descricao"] = dados.get("descricao", produto["descricao"])
            produto["valor"] = float(dados.get("valor", produto["valor"]))

            with open("produtos.json", "w") as arquivo_json:
                json.dump(produtos, arquivo_json, indent=4)

            return jsonify(produto), 200

    return jsonify({"erro": "Produto não encontrado"}), 404


# Editar apenas status do produto
@app.route("/produtos/<int:id>/status", methods=["PATCH"])
def alterar_status_produto(id):
    with open('produtos.json') as arquivo_json:
        produtos = json.load(arquivo_json)

    dados = request.get_json()

    if not dados:
        return jsonify({"erro": "o json não foi enviado"}), 400
    if 'status' not in dados:
        return jsonify({"erro": "não tem status"}), 400 

    produto_encontrado = False
    for produto in produtos:
        if produto['id'] == id:
            produto['status'] = dados.get('status', produto['status'])
            produto_encontrado = True
            break
    if not produto_encontrado:
        return jsonify({"erro": "o produto não se econtra"}), 404
    with open('produtos.json', 'w') as arquivo_json:
        json.dump(produtos, arquivo_json, indent=4) 
    return jsonify({"msg": f"alterar status do produto {id}"}), 200

# Deletar produto
@app.route("/produtos/<int:id>", methods=["DELETE"])
def deletar_produto(id):
    with open('produtos.json') as arquivo_json:
        produtos = json.load(arquivo_json)
    dados = request.get_json()

    if not dados:
        return jsonify({"erro": "json não enviado"}), 400

    produto_encontrado = False
    for produto in produtos:
        if produto['id'] == id:
            produtos.remove(produto)
            produto_encontrado = True
            break

        if not produto_encontrado:
            return jsonify({"erro" : "O produto não se encontra"}), 404
        with open('produtos.json','w') as arquivo_json:
            json.dump(produtos, arquivo_json, indent=4)
    return jsonify({"msg": f"deletar produto {id}"}), 200

if __name__ == "__main__":
    app.run(debug=True)
