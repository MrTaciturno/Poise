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
        console.log(PersonagemMovido.nome + " moveu " + a +"m. Distância atual: " + distAtual + "m.");
    } else{
        
        console.log(PersonagemMovido.nome + " moveu " + distAtual +"m. Chegou em melee.");
        distAtual=0;
    }

    return distAtual;
}

function atacar(PersonagemAtacante, PersonagemAlvo){


}

function combate(Personagem1, Personagem2, distInicial){
    console.log ("");
    console.log ("=-=-=-=COMEÇOU A BATALHA=-=-=-=");
    console.log ("");
    console.log ("Os combatentes " + Personagem1.nome + " e " + Personagem2.nome + " estão a " + distInicial + "m de distância.");
    
    let initiP1 = 0
    let initiP2 = 0;

    //rolar iniciativa
    while(initiP1==initiP2){
        initiP1 = rolarDados(6)+Personagem1.mettle;
        console.log (Personagem1.nome + " obeteve " + initiP1 + " de iniciativa: ("+ (initiP1-Personagem1.mettle) + " + " + Personagem1.mettle + ")" );
        initiP2 = rolarDados(6)+Personagem2.mettle;
        console.log (Personagem2.nome + " obeteve " + initiP2 + " de iniciativa: ("+ (initiP2-Personagem2.mettle) + " + " + Personagem2.mettle + ")" );

        if (initiP1==initiP2){
            console.log ("Empate, re-rolar!");
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
    console.log("=-=-=-=-=-=-=-=-=-=-=-=-=-=");

    let distAtual = distInicial;
    //decisão do primeiro jogador
   
    
    //aproximação dos players:
    let turno = 1;
    let PV1, PV2= 0;

    for (let rounds=0;rounds<=10;rounds++){ //trocar por while vida dos char
        PV1 = primeiro.hitPoints;
        PV2 = segundo.hitPoints;

        console.log("Começo do Turno " + turno);
        
        console.log("Começou a vez de " + primeiro.nome);
        for (let i = 0;i < primeiro.totalPA;i++){
            distAtual=mover(distAtual,primeiro);
            if(distAtual==0){console.log("Restam "+ (primeiro.totalPA-(i+1)) +" PA para "+primeiro.nome);break;}
            

        }
        console.log("Acabou a vez de " + primeiro.nome);

        
        if(distAtual==0){break;}
        
        console.log("Começou a vez de " + segundo.nome);
        for (let i = 0;i < segundo.totalPA;i++){
            distAtual=mover(distAtual,segundo);
            if(distAtual==0){console.log("Restam "+ (primeiro.totalPA-(i+1)) +" PA para "+segundo.nome); break;}
        }
        console.log("Acabou a vez de " + segundo.nome);
        
        if(distAtual==0){break;}
        console.log("Fim do Turno " + turno);
        console.log("");
        turno++;
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