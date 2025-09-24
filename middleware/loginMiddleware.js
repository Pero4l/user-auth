const {readFile} = require('../controllers/file-check');






async function loginMiddleware(req, res, next) {

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

        req.user = isMatch
        next() 
    
    
}


module.exports = {
    loginMiddleware
}