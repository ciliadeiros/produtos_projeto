from flask import Flask
from flask_inertia import Inertia, render_inertia
import json

app = Flask(__name__)

app.config['INERTIA_TEMPLATE'] = 'base.html'
Inertia(app)

@app.route('/')
def index():
    return render_inertia('Home')

@app.route('/produtos')
def produtos():
    # ler o arquivo JSON
    with open('produtos.json', 'r', encoding='utf-8') as f:
        lista_produtos = json.load(f)
    
    # enviar dados para o componente react como props
    return render_inertia('Produtos', props={'produtos': lista_produtos})

@app.route('/cadastro_prod')
def cadastro_prod():
    return render_inertia('CadastroProd')

@app.route('/editar_prod')
def editar_prod():
    return render_inertia('EditarProd')

@app.route('/remover_prod')
def remover_prod():
    return render_inertia('RemoverProd')

@app.route('/alterar_status')
def alterar_status():
    return render_inertia('Produtos')

if __name__ == "__main__":
    app.run(debug=True)

