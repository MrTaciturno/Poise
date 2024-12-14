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
        this.armadura = 0;
        this.def = might+ciclo;


        //substituir combatStyle por arma/escudo e armadura
    }
}

function mover(distAtual, PersonagemMovido){
    let a = PersonagemMovido.desloc;

    if (distAtual>a){
        distAtual = distAtual-a;
        console.log(PersonagemMovido.nome + " moveu " + a +"m. Distância : " + distAtual + "m.");
    } else{
        
        console.log(PersonagemMovido.nome + " moveu " + distAtual +"m. Chegou em melee.");
        //console.log("");
        distAtual=0;
    }

    return distAtual;
}

function atacar(PAtacante, PAlvo, paSOBRANDO){
    let roll = 0;
    let rolleDano = 0;
    let custoPA = 0;
    let Crit = 1; //multiplicador do resultado; 0 é falha crítica
    let Fulm = 0; //somador de resultado; 0 é não crítico;
    let secundario = false;

    if ((PAtacante.costPA == 1)||(paSOBRANDO>=2)){
        roll = rolarDados(PAtacante.dadoArma);
        if (roll==1) {custoPA++;Crit=0;} // erro critico
        if (roll==PAtacante.dadoArma&&PAtacante.costPA==2) custoPA--; // acerto fulminante
        if (roll==PAtacante.dadoArma) {Fulm = PAtacante.costPA;}

        rolleDano = roll + PAtacante.might + PAtacante.ciclo;
        custoPA = custoPA + PAtacante.costPA;
       
        // console.log(PAtacante.nome+ " ataca " + PAlvo.nome + ". Tirou " + roll + " no d"+ PAtacante.dadoArma + (Crit==0 ? " (ERRO CRÍTICO!!!)":"")+ (Fulm!=0 ? " (FULMINANTE!!!)":"")+" e consumiu " + custoPA + "PA, restando "+ paSOBRANDO-custoPA+"PA.");

     

    } else{
        secundario = true;
        roll = rolarDados(4);
        
        if (roll==1) {custoPA++;Crit=0;}
        if (roll==4) {Fulm = 1;}

        custoPA++; //custo normal do ataque secundário

        rolleDano = roll + PAtacante.might + PAtacante.ciclo;

        //console.log("Ataque secundário de " +PAtacante.nome+ " contra " + PAlvo.nome + " obteve " + roll + " no dado" + (Crit==0 ? " (ERRO CRÍTICO!!!)":"")+ (Fulm!=0 ? " (FULMINANTE!!!)":"")+" e consumiu " + custoPA + " PA.");
        
        
    }

    let defFinal = (secundario? (PAlvo.armadura<2 ? 2 : PAlvo.armadura) + PAlvo.def : (PAlvo.armadura<(PAtacante.dadoArma/2) ? (PAtacante.dadoArma/2) : PAlvo.armadura) + PAlvo.def);
    let danoFinal = (((rolleDano*Crit)+Fulm)-defFinal <= 0 ? 0 : ((rolleDano*Crit)+Fulm)-defFinal);
    
    console.log(PAtacante.nome+ " ataca" + (secundario?"(d4) ": "(d"+PAtacante.dadoArma+")") + PAlvo.nome + ". Tirou " + roll + " no d"+ (secundario? 4 : PAtacante.dadoArma) + (Crit==0 ? " (ERRO CRÍTICO!!!)":"")+ (Fulm!=0 ? " (FULMINANTE!!!)":"") + " Total:" +((rolleDano*Crit)+Fulm) + "(" + roll + "+" + PAtacante.might+ "+"+ PAtacante.ciclo + (Fulm!=0? "+" + Fulm : "")+")."+" Subtraindo a Defesa efetiva de " +PAlvo.nome+"("+defFinal + ") resultando em " +(danoFinal <= 0 ? 0 : danoFinal) + " de dano"
    
    
    
    +" e consumiu " + custoPA + "PA, restando "+ (paSOBRANDO-custoPA<0? 0 : paSOBRANDO-custoPA) + "PA.");
    
    //console.log("Resultado total do ataque "+ ((rolleDano*Crit)+Fulm) + "(" + roll + "+" + PAtacante.might+ "+"+ PAtacante.ciclo + (Fulm!=0? "+" + Fulm : "")+").");

    //console.log("Porém "+PAlvo.nome + " tem Defesa efetiva de " + defFinal + " resultando em: " +(danoFinal <= 0 ? 0 : danoFinal) + " de dano.");

    return [danoFinal,custoPA,roll];
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
    console.log("");

    let distAtual = distInicial;
    //decisão do primeiro jogador
   
    
    //aproximação dos players:
    let turno = 1;
    let PV1, PV2= 0;

    let defFinal = 0;
    let PAreal1 = 0;
    let PAreal2 = 0;
    
    //for (let rounds=0;rounds<=10;rounds++){ //trocar por while vida dos char
    PV1 = primeiro.hitPoints;
    PV2 = segundo.hitPoints;
    
    while((PV1>0)||(PV2>0)){
        

        let resultAtk = [0,0,0];
        console.log("Começo do Turno " + turno);
        
        PAreal1 = (PV1>6 ? primeiro.totalPA : (PV1<3? 3 : PV1));
        console.log("Começou a vez de: " + primeiro.nome + " (PV:"+PV1+" PA:"+PAreal1+")");

        for (let i = PAreal1;i >= 1;i--){
 
            if(distAtual==0) {
                console.log("");
                if (i!= 0) {
                    resultAtk = atacar(primeiro, segundo, i);
                    //defFinal = (segundo.armadura<(primeiro.dadoArma/2) ? (primeiro.dadoArma/2) : segundo.armadura) + primeiro.def; // dado negativo ou armadura
                    //PV2 = PV2-(resultAtk[0]-defFinal <= 0 ? 0 : resultAtk[0]-defFinal); // if def ficou negativo dá 0.
                    PV2 = PV2 - resultAtk[0];
                    console.log("Resta "+ PV2 +" de vida para " + segundo.nome);
                    if (resultAtk[1] > i) console.log( resultAtk[1]-i + " de PA foi pro Nether!");
                    if (resultAtk[1] == 2) i--;
                    if (resultAtk[1] == 3) i=i-2;
                }
                if(PV2<=0) {console.log(segundo.nome + " caiu!!"); break;}
            }
            if(distAtual!=0) distAtual=mover(distAtual,primeiro);
        }

        console.log("Acabou a vez de " + primeiro.nome);

        console.log("");
        if(PV2<=0) break;

        PAreal2 = (PV2>6 ? segundo.totalPA : (PV2<3? 3 : PV2));
        console.log("Começou a vez de " + segundo.nome+ " (PV:"+PV2+" PA:"+PAreal2+")");
        for (let i = PAreal2;i >= 1;i--){
            
            if(distAtual==0) {
                console.log("");
                if (i!= 0) {
                    resultAtk = atacar(segundo, primeiro, i);
                    //defFinal = (primeiro.armadura<(segundo.dadoArma/2) ? (segundo.dadoArma/2) : primeiro.armadura) + segundo.def; // dado negativo ou armadura
                    
                    //PV1 = PV1-(resultAtk[0]-defFinal <= 0 ? 0 : resultAtk[0]-defFinal); // if de def ficou negativo dá 0.
                    PV1 = PV1 - resultAtk[0];
                    //console.log("Porém "+primeiro.nome + " tem Defesa efetiva de " + defFinal + " resultando em: " +(resultAtk[0]-defFinal <= 0 ? 0 : resultAtk[0]-defFinal) + " de dano e 
                    console.log("Resta "+ PV1 +" de vida para " + primeiro.nome);
                
                    if (resultAtk[1] > i) console.log( resultAtk[1]-i + " de PA foi pro Nether!");

                    if (resultAtk[1] == 2) i--;
                    if (resultAtk[1] == 3) i=i-2;
                }

                if(PV1<=0) {console.log(primeiro.nome + " caiu!!"); break;}
            }
            if(distAtual!=0) distAtual=mover(distAtual,segundo);
        }

        console.log("Acabou a vez de " + segundo.nome);
        
        //if(distAtual==0){break;}

        console.log("Fim do Turno " + turno);
        console.log("");
        if (PV1<=0)break;
        turno++;
    }
    console.log("Fim da Batalha!! ");


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