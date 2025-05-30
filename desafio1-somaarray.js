console.log('\nSoma de todos os elementos de um array de números\n');

// Função que verifica se há valores inválidos e soma todos os números do array:
function somaArray(valores) {
    let numeros = valores.split(','); // Os valores foram separados por vírgula. 
    let valoresValidos = [];

    // Verificar se é NaN; é necessário tirar os espaços do início e fim pois isNaN('') = false ('' é tratado como 0).
    for (let i of numeros) {
        if (i.trim() === '' || isNaN(i)) { 
            return 'Erro: você digitou um ou mais valores inválidos!'
        }
        valoresValidos.push(Number(i));
    }
    return valoresValidos.reduce((soma, num) => soma + num, 0);
}

const readline = require('node:readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question('Digite os números do array separados por vírgula: ', resposta => {
    console.log('Resultado: ' + somaArray(resposta) + '\n');
    rl.close();
});