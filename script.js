function rolarDados(max){
    return Math.floor(Math.random()*max)+1;
//conferido! a media de 100000 arremessos deu (1+max)/2;
}












// //cria 10 Joes iguais
//const Army = [];

// for (let i = 0; i < 10; i++){
//     Army.push(new Personagem(`Joe${i}`, 3, 0));
// }

        //cria todas a permutações de atributo
        // let a = 0;
        // for (let i = 0; i <= 3; i++){
        //     for(let j = (3-i); j <= 3; j++){
        //         Army.push(new Personagem(`Joe${a}`, i, j, 4));
        //         a++;
        //     }
        // }






//  se quisermos exibir na tela todos os dados do senhor Alfredo, os que definimos dentro do nosso objeto? Para fazer isso, podemos utilizar o texto entre crases (`) em vez de aspas.

// Ao colocar nosso texto entre crases, o JavaScript nos permite utilizar a seguinte estrutura: “cifrão” seguido “abre e fecha chaves” (${}). Com isso, podemos inserir códigos e valores dinâmicos dentro do nosso texto.

// console.log(
//     `Esses são os dados do cidadão: nome -> ${dadosAlfredo.nome}, idade -> ${dadosAlfredo.idade}, endereço -> ${dadosAlfredo.endereco}`
//     );