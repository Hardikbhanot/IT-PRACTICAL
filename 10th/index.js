const http= require('http');
const port = 10000; 
const hostName='localhost';
const server = http.createServer((request, result) => {
    result.statusCode = 200;
    result.setHeader("Content-Type", "text/plain");
    result.end("Hello World, this is my Node.js server");
  });
  
  
  server.listen(port, hostName, () => {
    console.log(`Server running at http://${hostName}:${port}/`);
  });