function criarPersonagem() {
    return {
        might: 0,
        mind: 0,
        mettle: 0
    };
}


function Personagem() {
    this.might = 0;
    this.mind = 0;
    this.mettle = 0;
}




// Funcionou perfeitamente. Mas e se quisermos exibir na tela todos os dados do senhor Alfredo, os que definimos dentro do nosso objeto? Para fazer isso, podemos utilizar o texto entre crases (`) em vez de aspas.

// Ao colocar nosso texto entre crases, o JavaScript nos permite utilizar a seguinte estrutura: “cifrão” seguido “abre e fecha chaves” (${}). Com isso, podemos inserir códigos e valores dinâmicos dentro do nosso texto.

// console.log(
//     `Esses são os dados do cidadão: nome -> ${dadosAlfredo.nome}, idade -> ${dadosAlfredo.idade}, endereço -> ${dadosAlfredo.endereco}`
//     );