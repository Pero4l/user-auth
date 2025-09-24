const fs = require('fs');
const filePath = "./user.json"


function readFile(){ 
    try{

        if(!fs.existsSync(filePath)) return [];

        const data = fs.readFileSync(filePath, 'utf-8');

        return JSON.parse(data);
        
    } catch (err) {
        console.log("Error reading file:", err);
        return [];
    }
}


function writeFile(users){
    try{

        fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

    } catch (err) {

        console.log("Error writing file:", err);
    }
}


module.exports = { readFile, writeFile };