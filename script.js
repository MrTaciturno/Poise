function rolarDados(max){
    return Math.floor(Math.random()*max)+1;
//conferido! a media de 100000 arremessos deu (1+max)/2;
}



class Personagem {
    constructor(nome, ciclo, might, mind, dadoArma, size) {
        
        this.nome = nome;
        this.might = might;
        this.mind = mind;
        this.ciclo = ciclo;
        this.mettle = 6 - (might+mind);
        this.dadoArma = dadoArma; //4, 6, 8, 10, 12
        this.size = size; // 3 é medio
        this.costPA = (dadoArma<7 ? 1 : 2);
        this.totalPA = 3 + this.mettle;
        this.reach = this.mettle + might;
        this.desloc = size; //(menos capacidade de carga)
        this.hitPoints = 10+this.mettle+ciclo;

        //substituir combatStyle por arma/escudo e armadura
    }
}

function mover(distAtual, PersonagemMovido){
    let a = PersonagemMovido.desloc;

    if (distAtual>a){
        distAtual = distAtual-a;
        console.log(PersonagemMovido.nome + " moveu " + a +" Distancia atual:" + distAtual);
    } else{
        console.log(PersonagemMovido.nome + " moveu " + distAtual);
        distAtual=0;
        
    }

    return distAtual;
}

function atacar(PersonagemAtacante, PersonagemAlvo, ){


}

function combate(Personagem1, Personagem2, distInicial){

    let initiP1 = 0
    let initiP2 = 0;

    //rolar iniciativa
    while(initiP1==initiP2){
        initiP1 = rolarDados(6)+Personagem1.mettle;
        console.log (initiP1);
        initiP2 = rolarDados(6)+Personagem2.mettle;
        console.log (initiP2);
        if (initiP1==initiP2){
            console.log ("rerolar");
        }
    }

    let primeiro,segundo = new Personagem;

    if(initiP1>initiP2){
        primeiro = Personagem1;
        segundo = Personagem2;    

    }
    if(initiP1<initiP2){
        primeiro = Personagem2;
        segundo = Personagem1;
    }
    
    console.log("O " + primeiro.nome + " começa !");

    let distAtual = distInicial;
    //decisão do primeiro jogador
   
    
    //aproximação dos players:
    for (let rounds=0;rounds<=10;rounds++){ //trocar por while vida dos char
    
    
        for (let i = 0;i < primeiro.totalPA;i++){
            distAtual=mover(distAtual,primeiro);
            if(distAtual==0){console.log("chegou no melee. sobrou "+ i +" PA para "+primeiro.nome); break;}
            
        }
        if(distAtual==0){break;}
        for (let i = 0;i < segundo.totalPA;i++){
            distAtual=mover(distAtual,segundo);
            if(distAtual==0){console.log("chegou no melee. sobrou "+ i +" PA para "+segundo.nome); break;}
        }
        if(distAtual==0){break;}
        
    }



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