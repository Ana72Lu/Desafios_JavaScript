const { createServer } = require('node:http');
const { URL } = require('node:url');

const hostname = '127.0.0.1';
const port = 3000;

const server = createServer((request, response) => {
    response.setHeader('Content-Type', 'application/json');

    try {
        const url = new URL(request.url, `http://${hostname}:${port}`)

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
                    
                    if(isNaN(incrementValue) || incrementValue <= 0 || !Number.isInteger(incrementValue)){
                        response.statusCode = 400;
                        response.end(JSON.stringify({ error: 'Invalid input!' }))
                    } else {
                        response.statusCode = 200;
                        response.end(JSON.stringify({ counter: incrementValue }));
                    }

                } catch (error) {
                    response.statusCode = 400;
                    response.end(JSON.stringify({ error: 'Invalid JSON body' }));
                }
            });

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