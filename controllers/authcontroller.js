const {writeFile, checkFile} = require('./file-check');

const bcrypt = require('bcrypt')


async function register(req, res) {
    const {name, email, password} = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({message: "All fields are required"});

    }
    
    if (password.length < 6 && !/[A-Z]/.test(name) && !/[a-z]/.test(name)) {
        return res.status(400).json({message: "Password must be at least 6 characters and contain both uppercase and lowercase letters"});

    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({message: "Invalid email format"});
    } else if (name.length < 3) {
        return res.status(400).json({message: "Name must be at least 3 characters"});

    } else{

    const hashPassword = await bcrypt.hash(password, 13);

        console.log(hashPassword);
        

    const user = checkFile();

    const userExists = user.find((user) => user.email === email);

    if (userExists) {
        return res.status(409).json({message: "User already exists"});
    }

    user.push({name, email, password: hashPassword});

    writeFile(user);

    return res.status(201).json({message: "User registered successfully"});
    }

    
}



async function login(req, res) {

    const {email, password} = req.body;

    const user = checkFile();

    const userExists = user.find((user) => user.email === email);

    const isMatch = await bcrypt.compare(password, userExists.password)

    if(userExists && isMatch ){
        
        res.status(200).json({
            success: true,
            message: "Login Successfully"
        });

    } else{

          res.status(400).json({
            success: false,
            message: "Login Invalid"
        });
    }
    
}


module.exports = {
    register, login
}