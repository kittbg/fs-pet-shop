const http = require('http');
const fs = require('fs');
const port = 3000;

const server = http.createServer((req, res) => {
 console.log('something happened')
fs.readFile('pets.json', 'utf-8', (error, data) => {
  const petRegExp = /^\/pets\/(.*)$/;  //defines the expression to match and capture in the URL
  const match = petRegExp.exec(req.url);  //matches URL expression & creates an array [/pets/0, 0]
  const pets = JSON.parse(data);
//   const index = parseInt(req.url.slice(6));
  if (req.method === 'GET' && req.url === '/pets'){
    var petsJSON = JSON.stringify(pets)
    res.writeHead(200, {'Content-type': 'application/json'});
    res.end(petsJSON)
  } else if (req.method === 'GET' && match){ //use match as a variable
    const id = match[1];  //sets ID as the element at index one of the array [/pets/0, 0]
    const pet = pets[id]  //sets pet as the obj at pets[id] = pets[0]
   
    if (pet){
      const petJSON = JSON.stringify(pet); //argument is set to pet = pets[0]
      res.writeHead(200, {'Content-type': 'application/json'});
      res.end(petJSON) //dispays result of petJSON
    } else {
      res.writeHead(404, {'Content-type': 'text/plain'});
      res.end('Not found')
    }
  } else {
    res.writeHead(404, {'Content-type': 'text/plain'});
    res.end('Not found') 
  }
})
})

server.listen(port, (error) => {
    if (error){
    console.error('error')
    } else {
    console.log(`Server is running ${port}`)
    }
})