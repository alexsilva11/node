const nomePetshop = "Petshop DH";

console.log(`** ${nomePetshop} **`);

let pets = [
  {
    nome: "Batman",
    tipo: "cão",
    raca: "labrador",
    idade: 5,
    genero: "M",
    vacinado: false,
    servicos: ["banho", "tosa"]
  },
  {
    nome: "Costelinha",
    tipo: "cão",
    raca: "vira-lata",
    idade: 10,
    genero: "M",
    vacinado: true,
    servicos: ["banho"]
  },
  {
    nome: "Scooby Doo",
    tipo: "cão",
    raca: "Dogue Alemão",
    idade: 51,
    genero: "M",
    vacinado: false,
    servicos: ["banho", "tosa"]
  },
  {
    nome: "Tom",
    tipo: "gato",
    raca: "poodle",
    idade: 5,
    genero: "M",
    vacinado: false,
    servicos: ["corte de unha"]
  },
  {
    nome: "Ada",
    tipo: "iguana",
    raca: "albina",
    idade: 5,
    genero: "F",
    vacinado: true,
    servicos: ["banho"]
  }
];


const listarPets = () => {
    let conteudo = ""
    for (let pet of pets) {
   conteudo+= (`
   ------------------------
   Nome: ${pet.nome}
   Tipo: ${pet.tipo}
   Raça: ${pet.raca}
   Idade: ${pet.idade} anos
   Genero: ${pet.genero == "F" ? "femea" : "macho"}
   Vacinado: ${pet.vacinado ? "sim" : "não"}
   Serviços: ${pet.servicos}
   `);
}
return conteudo
};

const validarDados = novoPet => {
    return (
        novoPet.nome &&
        novoPet.idade &&
        novoPet.tipo &&
    novoPet.raca &&
    novoPet.genero
    );
};

const adicionarPet = novoPet => {
    if (typeof novoPet == "object" && validarDados(novoPet)) {
    // adiciona o pet
    novoPet.nome = String(novoPet.nome);
    novoPet.idade = parseInt(novoPet.idade);

    if (!novoPet.servicos) {
      novoPet.servicos = [];
    }
    
    pets.push(novoPet);
    return (`${novoPet.nome} foi adicionado com sucesso`)
} else {
    return("Ops, insira um argumento valido!");
}
};

const buscarPet = nomePet => {
    let petsEncontrados = pets.filter(pet => pet.nome == nomePet);
  
    return petsEncontrados; 
  };

const contarVacinados = () => {
  let vacinados = pets.filter(pet => pet.vacinado).length;
  let naoVacinados = pets.filter(pet => !pet.vacinado).length;

  console.log(`
  ------------------------
  Temos ${vacinados} pets vacinados.
  Temos ${naoVacinados} pets NÃO vacinados.
  ------------------------
  `);
};

const vacinarPet = pet => {
  if (!pet.vacinado) {
    pet.vacinado = true;
    console.log(`${pet.nome} foi vacinado com sucesso!`);
  } else {
    console.log(`Ops, ${pet.nome} já está vacinado!`);
  }
};

const campanhaVacina = () => {
  let petVacinadosCampanha = 0;
  for (let pet of pets) {
    if (!pet.vacinado) {
      vacinarPet(pet);
      petVacinadosCampanha++;
    }
  }
  return(`
  Campanha de Vacinação 2020
  ${petVacinadosCampanha} pets foram vacinados nessa campanha!`);
};

const darBanhoPet = pet => {
  pet.servicos.push("banho");
  console.log(`${pet.nome} está de banho tomado!`);
};

const tosarPet = pet => {
  pet.servicos.push("tosa");
  console.log(`${pet.nome} está com cabelinho na régua :)`);
};

const apararUnhasPet = pet => {
  pet.servicos.push("corte de unhas");
  console.log(`${pet.nome} está de unhas aparadas!`);
};

const atenderPet = (pet, servicos) => {
    servicos(pet)
  
  return(`Bem vindo, ${pet.nome}

  Volte sempre, ${pet.nome}`)
};
const pagar = () => {
    return ("Pagamento realizado com sucesso!")
}

module.exports = { listarPets, adicionarPet,buscarPet, campanhaVacina, atenderPet, pagar };