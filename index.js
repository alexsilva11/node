const http = require('http');
const petshop = require('./petshop')
const url = require('url');

const server = http.createServer((req,res) => {
    res.writeHead(200, {"Content-Type": "text/plain; charset=UTF-8"});
    let urlCompleta = url.parse(req.url, true);
    let queryString = urlCompleta.query;
    let rota = urlCompleta.pathname;

    // console.log(queryString);

    switch (rota){
        case "/pets":
            let conteudo = petshop.listarPets();
            if(conteudo.length > 0){
                res.write(conteudo)
            } else {
                res.write("Nenhum Pet cadastrado :(")
            }
            break;
        case "/pets/add":
            let novoPet = queryString;
            if (petshop.adicionarPet(novoPet)){
                res.write(`${novoPet.nome} foi adicionado a nossa lista!`);
                
            } else {
                res.write("Nenhum Pet foi adicionado :(")
            }
            break;
        case "/pets/buscar":
            let nomePet = queryString.nome;
            let petsEncontrados = petshop.buscarPet(nomePet)
            if (petsEncontrados.length > 0){
                res.write(`Encontramos ${petsEncontrados.length} pets com o nome ${nomePet}`)
            } else{
                res.write("Ops, nenhum pet encontrado com esse nome!")  
            }
            break;
        default:
            res.write("tô perdido")
    }
    res.end()
}).listen(3000, 'localhost', () => {
    console.log("Servidor rodando :)")
 })