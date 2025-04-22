console.log('\nVerificar se uma String é um Palíndromo\n');

// Função que verifica se a String informada é um palíndromo:
function stringPalindromo(stringVerifica) {
    let minEspaco = stringVerifica.replaceAll(' ', '').toLowerCase(); // Remover os espaços e deixar as letras minúsculas.
    let minEspacoAcento = minEspaco.normalize('NFD').replaceAll(/[\u0300-\u036f]/g, ''); // Remover os acentos.

    return minEspacoAcento === minEspacoAcento.split('').reverse().join(''); // Verificar se é igual de trás para frente.
}

const readline = require('node:readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question('Informe a String: ', resposta => {
    console.log('Resultado: ' + stringPalindromo(resposta) + '\n');
    rl.close();
});