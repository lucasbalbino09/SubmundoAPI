const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); // Módulo para manipular caminhos de arquivos
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Servir arquivos estáticos na pasta 'public'

const usuarios = [
    { id: 1, nome: 'UsuarioTeste', email: 'usuario@teste.com', senha: 'senha123' }
];

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});


app.post('/login', (req, res) => {
    const { email, senha } = req.body;
    const usuario = usuarios.find(u => u.email === email);
    if (!usuario || usuario.senha !== senha) {
        return res.status(401).send('Credenciais inválidas');

    }
    res.redirect('/cadastro.html');
});

app.post('/cadastro', (req, res) => {

    const { email, nome, senha } = req.body;
    const usuarioExiste = usuarios.some(u => u.email == email)

    if (usuarioExiste) { return res.status(409).send('usuario já existe'); }

    const novoUsuario = { id: usuarios.length + 1, nome: nome, senha: senha, email: email }

    usuarios.push(novoUsuario);
    res.redirect('/sucesso.html');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

