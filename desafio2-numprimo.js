console.log('\nVerificar se um número é primo\n');

// Função que verifica se um número é primo e se o valor informado é válido:
function numPrimo(num) {
    let numConvertido = Number(num);
    
    if (isNaN(num) || num.trim() === '') return 'Valor inválido enviado!';
    
    // Números negativos, decimais, 0 e 1 não são primos.
    if (numConvertido < 2 || !Number.isInteger(numConvertido)) return false;

    // Verificar se o número é dividido por um número que não seja 1 e ele mesmo.
    for (let i = 2; i < numConvertido; i++) {
        if (numConvertido % i === 0) return false;
    }
    return true;
}

// Configuração do input:
const readline = require('node:readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question('Digite o número: ', resposta => {
    console.log('Resultado: ' + numPrimo(resposta) + '\n'); // Chama a função numPrimo().
    rl.close();
});