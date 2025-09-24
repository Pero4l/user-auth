const {writeFile} = require('../controllers/file-check');

function registerCheck(req, res){
    const user = req.user;


    user.push({
        name: req.body.name,
        email: req.body.email,
        password: req.hashedPassword
    });

    writeFile(user);

    
    res.status(200).json({
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
    registerCheck,
    login
}

