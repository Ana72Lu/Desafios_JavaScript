const { createServer } = require('node:http');
const { URL } = require('node:url');

const hostname = '127.0.0.1';
const port = 3000;

let counter = 0;

const server = createServer((request, response) => {
    response.setHeader('Content-Type', 'application/json');

    try {
        const url = new URL(request.url, `http://${hostname}:${port}`);

        if (request.method === 'GET' && url.pathname === '/health-check') {
            response.statusCode = 200;
            response.end(JSON.stringify({
                success: true,
                timestamp: new Date().toISOString()
            }));

        } else if (request.method === 'GET' && url.pathname === '/is-prime-number') {
            const queryParams = Object.fromEntries(url.searchParams.entries());
            const num = Number(queryParams.number);
            
            if (num >= 1 && !isNaN(num) && Number.isInteger(num)) {
                let isPrime = true;
        
                if (num < 2) {
                    isPrime = false;
                } else {
                    for (let i = 2; i < num; i++) {
                        if (num % i === 0) {
                            isPrime = false;
                            break;
                        }
                    }
                }     
                response.statusCode = 200;
                response.end(JSON.stringify({ isPrime: isPrime }));   

            } else {
                response.statusCode = 400;
                response.end(JSON.stringify({ message: 'Invalid input' }));
            }
            
        } else if (request.method === 'POST' && url.pathname === '/count') {
            let body = '';

            request.on('data', chunk => {
                body += chunk.toString();
            });

            request.on('end', () => {
                try {
                    const incrementValue = body ? JSON.parse(body).incrementBy : undefined;
                    
                    if (isNaN(incrementValue) || incrementValue <= 0 || !Number.isInteger(incrementValue)) {
                        response.statusCode = 400;
                        response.end(JSON.stringify({ error: 'Invalid input!' }));
                    } else {
                        counter += incrementValue;
                        response.statusCode = 200;
                        response.end(JSON.stringify({ counter: counter }));
                    }

                } catch (error) {
                    response.statusCode = 400;
                    response.end(JSON.stringify({ error: 'Invalid JSON body' }));
                }
            });

        } else if (request.method === 'GET' && url.pathname === '/stock-insight') {
            const queryParams = Object.fromEntries(url.searchParams.entries());
            const currency = queryParams.currency || 'usd';
        
            if (currency === 'usd' || currency === 'brl') {
                fetchPrice(currency);
            } else {
                response.statusCode = 400;
                response.end(JSON.stringify({ message: 'Invalid param!' }));
            }

            async function fetchPrice(currency) {
                try {
                    const coingecko = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=${currency}`, {
                        method: 'GET',
                        headers: { accept: 'application/json' }
                    });
        
                    if (!coingecko.ok) {
                        throw new Error(`Erro ao buscar preço do Bitcoin: ${coingecko.statusText}`);
                    }
        
                    const responseCoingecko = await coingecko.json();        
                    const price = responseCoingecko.bitcoin[currency];
        
                    if (!price) {
                        throw new Error('Preço do Bitcoin não encontrado!');
                    }
        
                    let maxBuy = 80_000;
                    let maxBuyGood = 60_000;
                    
                    if (currency === 'brl') {
                        maxBuy = 450_000;
                        maxBuyGood = 300_000;
                    }
                    
                    let suggestion = '';
                    if (price > maxBuy) {
                        suggestion = 'Bitcoin está caro. Pode ser melhor esperar.';
                    } else if (price < maxBuyGood) {
                        suggestion = 'Bom momento para compra!';
                    } else {
                        suggestion = 'Preço razoável. Avalie antes de comprar.';
                    }
        
                    const resPriceSuggestion = JSON.stringify({
                        btc_price: price,
                        currency: currency,
                        suggestion: suggestion
                    });
        
                    response.statusCode = 200;
                    response.end(resPriceSuggestion);
        
                } catch (error) {
                    response.statusCode = 400;
                    response.end(JSON.stringify({ error: error.message }));
                }
            }        
        } else {
            response.statusCode = 404;
            response.end(JSON.stringify({ message: 'Route not found' }));
        }

    } catch (error) {
        console.log(error);
        response.statusCode = 500;
        response.end(JSON.stringify({ error: 'Internal Server Error' }));
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});