const tela = document.querySelector('div#tela')

let coden = 0 // indica em qual numero esta sendo inserido as informações, codigo do num
let n = ['',''] // numeros
let op = 0 // qual tipo de operação a ser realizada
let mem = '' // oq vai aparecerendo na tela /memoria
let trava = 0 
function calc(botao){
    if(trava == 1){
        if(botao == 'C'){ // reseta a calc
            mem = ''
            n[0] = ''
            n[1] = ''
            coden = 0
            op = 0
            trava = 0
        }
    }else{
        if(typeof(botao) == 'string'){ 
            
            if(botao == 'C'){ // reseta a calc
                mem = ''
                n[0] = ''
                n[1] = ''
                coden = 0
                op = 0

            }else if(botao == 'c'){ // corrige
                mem = mem.slice(0, (mem.length-1)) //string - ultimo elemento
                n[coden] = (n[coden]).slice(0, ((n[coden]).length-1))

            }else{

                switch (botao){
                case 'x':
                    if(add('x')) calcula(1)
                    break
                case '/':
                    if(add('/')) calcula(2)
                    break
                case '+':
                    if (add('+')) calcula(3)
                    break
                case '-':
                    if (add('-')) calcula(4)
                    break
                default: //chamada pelo botão igual
                    calcula(0)
                }
            }
        }else{ // numeros
            add(botao)
        }
        
    }
    tela.innerHTML = mem
}

function add(a){ // passa info pra tela

    console.log(coden)

    const sinais = ['x', '/', '+', '-']
    let ret = 1

    if(n[coden].length == 0 && a == '-'){
        n[coden] += (a)
        mem += a
        ret = 0

    }else if(sinais.indexOf(a) != -1){
        if((a != '-' && (sinais.indexOf(mem[mem.length-1]) != -1)) || (mem[mem.length-1] == '+' && a == '-') ||
            (mem[mem.length-1] == a)){
            mem = mem.slice(0, (mem.length-1)) // tratamento de inserção de sinais seguidos
            if(op!=0) op = (sinais.indexOf(a)+1)
            ret = 0

        }else if(n[coden].length == 0){
            n[coden] = '0' 
            mem = n[coden]
            
        }
        mem+=a  
        coden = 1
        
    }else{
        n[coden] += (a)
        mem += a
    }

    return ret
}

function calcula(c){
    if (op == 0){
        op = c //primeira chamada
        if(c!=0) coden = 1
    }else{
        if(n[1] == '') n[1] = 0
        
        const result = ['', 'x', '/','+','-'] 

        switch (op){
            case 1:
                n[0] = Number(n[0])*Number(n[1])
                break
            case 2:
                if(n[1]==0){
                    mem = 'ERRO:div/0'
                    alert('Não é possivel dividir por 0!!')
                    tela.innerHTML = mem
                    trava = 1
                    return
                }
                n[0] = Number(n[0])/Number(n[1])
                break
            case 3:
                n[0] = Number(n[0])+Number(n[1])
                break
            case 4:
                console
                n[0] = Number(n[0])-Number(n[1])
                break
        }    
        if (c == 0) coden = 0
        else coden = 1 // variavel para setar em qual numero vamos mexer

        n[1] = '' // reseta o segundo número
        n[0] = n[0].toFixed(2)
        mem = `${n[0]}${result[c]}` //printa o resultado na tela
        op = c // atualiza a variavel de controle
    }
}
