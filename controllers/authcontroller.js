let {writeFile, readFile} = require('../utils/file-check');
const bcrypt = require('bcrypt')



async function register(req, res){
        const {name, email, role, password} = req.body;

      
    if (!name || !email, !role || !password) {
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
    
    const users = readFile()

    const hashedPassword = await bcrypt.hash(password, 13)

   const newUser = {
        name,
        email,
        role,
        password: hashedPassword
    }
        

    users.push(newUser)

    writeFile(users)

    res.status(201).json({ message: "User registered successfully" });


    }




async function login(req, res){

    const user = req.user;

    if(user){
          res.status(200).json({
        success: true,
        message: "Login Successfully"
    })
    }

  
    

}

module.exports ={
    register,
    login
}

