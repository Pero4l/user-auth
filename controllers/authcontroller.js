let {writeFile, readFile} = require('../controllers/file-check');
const bcrypt = require('bcrypt')

async function register(req, res){

    const user = req.user
    const check = req.check

    if(!check){

          const hashPassword = await bcrypt.hash(user.password, 13);

        console.log(hashPassword);

        const users = readFile()

        
        const newUser = {
            name: user.name,
            email: user.email,
            role: user.role,
            password: hashPassword

        }

        users.push(newUser)
        

     writeFile(users)

     res.status(201).json({
        success: true,
        message: "User registered successfully"
    })

    } else{
        
          return res.status(409).json({
            message: "User already exists"
        })
    }

   
    
}



function login(req, res){

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

