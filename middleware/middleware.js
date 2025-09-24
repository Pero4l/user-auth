const {readFile} = require('../controllers/file-check');


async function registerCheck(req, res, next) {
    
    

    let users = readFile();
    if (!Array.isArray(users)) {
        users = [];
    }


    let userExists = users.find((user) => user.email === email);



    const user = {
        name, email, role, password
    }

    req.user = user
    req.check = userExists
    next();
    
}





async function checkLogin(req, res, next) {

    const {email, password} = req.body;

    const user = readFile();

    const userExists = user.find((user) => user.email === email);

    const isMatch = await bcrypt.compare(password, userExists.password)

    if(!userExists && isMatch ){

         res.status(400).json({
            success: false,
            message: "Login Invalid"
        });
        
    }

        req.user = userExists
        next() 
    
    
}


module.exports = {
    registerCheck, checkLogin
}