console.log('\nVerificar se uma String é um Palíndromo\n');

// Função que verifica se a String informada é um palíndromo:
function stringPalindromo(stringVerifica) {
    let minSemEspaco = stringVerifica.replaceAll(" ", "").toLowerCase(); // Remover os espaços e deixar as letras minúsculas.

    return minSemEspaco === minSemEspaco.split('').reverse().join(''); // Verificar se é igual de trás para frente.
}

// Configuração do input:
const readline = require('node:readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question('Informe a String: ', resposta => {
    console.log('Resultado: ' + stringPalindromo(resposta) + '\n'); // Chama a função stringPalindromo().
    rl.close();
});