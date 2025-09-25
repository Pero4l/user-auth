let {writeFile, readFile} = require('../utils/file-check');
const bcrypt = require('bcrypt')



async function register(req, res){
        const {name, email, role, password} = req.body;

        let users = readFile();

      
    if (!name || !email || !role || !password) {
        return res.status(400).json({message: "All fields are required"});
    }
    
    if (password.length < 6 || !/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
        return res.status(400).json({
            message: "Password must be at least 6 characters and contain both uppercase and lowercase letters"
        });
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({message: "Invalid email format"});
    } else if (name.length < 3) {
        return res.status(400).json({message: "Name must be at least 3 characters"});
    }
    
    if(users.find((u) => u.name === name && u.email === email)){
        return res.status(400).json({
            "success": false,
            "message": "User already exists"
        })
    }
   

    const hashedPassword = await bcrypt.hash(password, 13)
    
    const id = users.length + 1;
    const date = new Date().toLocaleString();

    const newUser = {id, name, email, role, password: hashedPassword, date}

    users.push(newUser)

    writeFile(users)

    console.log(newUser.id);
    console.log(users);
    
    

    res.status(201).json({ 
        "success" : true,
        "message": "User registered successfully" 
    });


    }


async function login(req, res){

    if(req.user){
          res.status(200).json({
        success: true,
        message: "Login Successfully"
    })
    }


}

// async function login(req, res){
//     if (req.user) {
//         res.status(200).json({
//             success: true,
//             message: "Login Successfully"
//         });
//     } else {
//         res.status(401).json({
//             success: false,
//             message: "Invalid credentials"
//         });
//     }
// }

module.exports ={
    register,
    login
}

