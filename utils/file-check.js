const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, "../user.json")

function readFile(){
    let users = {}
    let data;
    try{
        if(!fs.existsSync(filePath)) return [];
        try{
        const data = fs.readFileSync(filePath, 'utf-8');
        if(data){
        return users = JSON.parse(data);
        }
        } catch (err){
            console.log("Error reading file:", err);
            
        }
        
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