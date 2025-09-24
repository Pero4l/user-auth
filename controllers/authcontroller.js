const {writeFile} = require('../controllers/file-check');

function register(req, res){
    const user = req.user;

    if(user){
         writeFile(user);
        return res.status(201).json({
            message: "User registered successfully"
        });
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

