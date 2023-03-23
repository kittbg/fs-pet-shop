var fs = require('fs');
let option = process.argv[2];



switch (option) {
    case 'read':
        fs.readFile('pets.json', 'utf-8', (error, data) => {
          let pets = JSON.parse(data);
          let index = parseInt(process.argv[3]);
          if (index >= 0 && index < pets.length){
          console.log(pets[index]);
          } else {
            console.log("Usage: node pets.js read INDEX")
          }
        })
        break;
    case 'create':
        fs.readFile('pets.json', 'utf-8', (error, data) => {
            let pets = JSON.parse(data);
            let age = parseInt(process.argv[3]);
            let kind = process.argv[4];
            let name = process.argv[5];
            var newPet = {"age": age, "kind": kind, "name": name};

            if (age && kind && name){
                console.log(newPet)
                pets.push(newPet)
                fs.writeFileSync('pets.JSON', JSON.stringify(pets))
            } else {
                console.log("Usage: node pets.js create AGE KIND NAME");
            }
        })
        break;
    case 'update':
        fs.readFile('pets.json', 'utf-8', (error, data) => {
            let pets = JSON.parse(data);
            let index = process.argv[3]
            let age = parseInt(process.argv[4]);
            let kind = process.argv[5];
            let name = process.argv[6];
            var newPet = {"age": age, "kind": kind, "name": name};
            

            if (age && kind && name){
                pets[index] = newPet;              
                fs.writeFile('pets.JSON', JSON.stringify(pets), function(error){
                    if(error){
                        console.log(error)
                    } else {
                        console.log(pets)
                    }
                  })
                }
            })
        console.log("Usage: node pets.js update INDEX AGE KIND NAME");
        break;
    case 'destroy':
        fs.readFile('pets.json', 'utf-8', (error, data) => {
            let pets = JSON.parse(data);
            let index = process.argv[3];
            console.log(pets[index]);
            pets.splice(index, 1);
            fs.writeFileSync('pets.JSON', JSON.stringify(pets))
            console.log(pets);
        })
        
        break;
    default:
        console.error(`usage: node pets.js [read, create, update, destroy]`)               
}


