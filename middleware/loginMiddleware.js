const {readFile} = require('../utils/file-check');
const bcrypt = require('bcrypt')

async function loginMiddleware(req, res, next) {

    const {email, password} = req.body;

    const user = readFile();

    const userExist = user.find((user) => user.email === email);

    const isMatch = await bcrypt.compare(password, userExist.password)

    if(!userExist && isMatch ){

         res.status(401).json({
            success: false,
            message: "Invalid credentials"
        });
        
    }

        req.user = isMatch

        next() 
    
    
}


module.exports = {
    loginMiddleware
}