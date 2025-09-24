let {writeFile} = require('../controllers/file-check');
const bcrypt = require('bcrypt')

async function register(req, res){
    const {name, email, password} = req.body

     const hashPassword = await bcrypt.hash(password, 13);

        console.log(hashPassword);

     writeFile({name, email, password: hashPassword})

     res.status(201).json({
        success: true,
        message: "User registered successfully"
    })
    
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

