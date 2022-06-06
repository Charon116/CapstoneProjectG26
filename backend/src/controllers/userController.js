import userService from '../services/userService'

const handleLogin = async (req,res) => {
    let email = req.body.email;
    let password = req.body.password;
    //check email exist
    if(!email || !password){
        return res.status(500).json({
            errCode: 1,
            message: "Email or password is empty"
        })
    }

    let userData = await userService.handleUserLogin(email,password);
    
    //compare password match
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ?  userData.user : {}
    })
}

module.exports = {
    handleLogin: handleLogin
}