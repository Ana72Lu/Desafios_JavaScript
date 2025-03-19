// Configuração do input:
const readline = require('node:readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

console.log('\nJogo "Pedra, Papel, Tesoura"');

perguntaJogador(); // Chamar a função perguntaJogador().

// Função que verifica a opção escolhida pelo jogador, incluindo se é válida, e retorna o resultado:
function verificaEscolha(valor) {
    const opcoes = ['pedra', 'papel', 'tesoura'];
    let escolhaJogador;

    switch (valor) {
        case '1':
            escolhaJogador = 'pedra';
            break;
        case '2':
            escolhaJogador = 'papel';
            break;
        case '3':
            escolhaJogador = 'tesoura';
            break;
        default:
            console.log('\nOpção inválida! Digite 1, 2 ou 3!');
            return;
    }

        let escolhaComputador = opcoes[Math.floor(Math.random() * 3)]; // Escolha feita pelo computador.

        // Comparação entre a escolha do jogador e do computador:
        let resultado = 'Você perdeu!';
        
        if (escolhaJogador === escolhaComputador) {
            resultado = 'Empate!';
        }
        else if (escolhaJogador === 'pedra' && escolhaComputador === 'tesoura') {
            resultado = 'Você ganhou!';
        }
        else if (escolhaJogador === 'tesoura' && escolhaComputador === 'papel') {
            resultado = 'Você ganhou!';
        }
        else if (escolhaJogador === 'papel' && escolhaComputador === 'pedra') {
            resultado = 'Você ganhou!';
        }

        // Mostrar a escolha do computador para o jogador e retornar o resultado.
        console.log(`\nEscolha do computador: ${escolhaComputador}`);
        return resultado;
}

// Função que inicia o jogo:
function perguntaJogador() {
    rl.question(
    `
Opções:
1 - Pedra
2 - Papel
3 - Tesoura       
Escolha a opção conforme os números: `, resposta => {
            let resultado = verificaEscolha(resposta); // Chama a função verificaEscolha().
            if(resultado) {
                console.log('Resultado do jogo: ' + resultado); // Mostrar o resultado para o jogador.
            }
            jogoNovo(); // Chama a função jogoNovo().
        });
}

// Função que pergunta para o jogador se ele quer jogar novamente:
function jogoNovo() {
    rl.question('\nQuer jogar de novo? (s/n): ', (resposta) => {
        if (resposta.toLowerCase() === 's') {
            perguntaJogador(); // Chama a função perguntaJogador().
        } else {
            rl.close();
        }
    });
}