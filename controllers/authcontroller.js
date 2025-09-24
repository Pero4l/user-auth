function registerCheck(req, res){
    const user = req.user

    
    res.status(200).json({
        success: true,
        message: "User registered successfully"
    })
}

module.exports ={
    registerCheck
}