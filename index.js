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
            res.write(petshop.adicionarPet(novoPet))
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
        case "/pets/campanha":
            res.write("Vacinando...")
            res.write(petshop.campanhaVacina())

            break
        case "/pets/atender":
            let pet = queryString.nome
            let servico = queryString.servico
            if(pet && servico){
                res.write(petshop.atenderPet(pet, servico))
            } else {
                res.write(`Escolha um Pet e um Serviço`)
            }
        break
        case "/pets/pagar":
            res.write(petshop.pagar())
        break
        default:
            res.write("tô perdido")
    }
    res.end()
}).listen(3000, 'localhost', () => {
    console.log("Servidor rodando :)")
 })