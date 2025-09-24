const {readFile} = require('../controllers/file-check');


async function registerCheck(req, res, next) {
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