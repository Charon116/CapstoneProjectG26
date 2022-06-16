import userService from '../services/userService'
const users = require('../models').User;
const bcrypt = require('bcrypt');
const randtoken = require('rand-token');
const connectDB = require('../config/connectDB');

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

const handleSignup = async (req,res) => {
    let message = await userService.signUpUser(req.body)
    
    return res.send('Sign up from server')
}

let handleGetAllUsers = async (req, res) =>{
    let id = req.query.id;
    if(!id){
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
            users: []
        })
    }
    let users = await userService.getAllUsers(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        users
    })
}

let handleDeleteUser = async(req, res) =>{
    if(!req.body.id){
        return res.status(200).json({
            errCode:1,
            errMessage: "Missing required parameters!"
        })
    }
    let message = await userService.deleteUser(req.body.id)
    
    return res.status(200).json(message);

}

let handleEditUser = async(req, res) => {
    let data = req.body;
    let message = await userService.updateUserData(data);
    return res.status(200).json(message)
}

let getAllCode = async(req, res) => {
    try {

        let data = await userService.getAllCodeService(req.query.type);
        return res.status(200).json(data);
    } catch (error) {
        console.log('Get all code error: ',error);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

// const passwordReset = (email) => {
//     return new Promise(async(resolve,reject) => {
//         try {
//             let user = await db.User.findOne({
//                 where: {email: userEmail}
//             })
//             if(user){
//                 var token = randtoken.generate(20);
//                 var sent = sendEmail(email, token);
//                 resolve(true)
//             }else{
//                 resolve(false)
//             }
//         } catch (error) {
//             reject(error)
//         }
//     })
    
    
//      users.sequelize.query('SELECT * FROM users WHERE email ="' + email + '"', function(err, result) {
//         if (err) throw err;
            
//         var type = ''
//         var msg = ''

//         console.log(result[0]);
        
//         if (result[0].email.length > 0) {
//             var token = randtoken.generate(20);

//             var sent = sendEmail(email, token);

//             if (sent != '0') {
//                 var data = {
//                     token: token
//                 };
//                 users.sequelize.query('UPDATE users SET ? WHERE email ="' + email + '"', data, function(err, result) {
//                     if(err) throw err
//                 })
//                 type = 'success';
//                 msg = 'The reset password link has been sent to your email address';
//             } else {
//                 type = 'error';
//                 msg = 'Something goes to wrong. Please try again';
//             }
//         } else {
//             console.log('2');
//             type = 'error';
//             msg = 'The Email is not registered with us';
//         }
//         req.flash(type, msg);
//         res.redirect('/');
//     });
// }

// const updatePassword = (req, res, next) => {
//     var token = req.body.token;
//     var password = req.body.password;

//     models.sequelize.query('SELECT * FROM users WHERE token ="' + token + '"', function(err, result) {
//         if (err) throw err;
//         var type
//         var msg
//         if (result.length > 0) {
//                 var saltRounds = 10;
//                 // var hash = bcrypt.hash(password, saltRounds);
//             bcrypt.genSalt(saltRounds, function(err, salt) {
//                     bcrypt.hash(password, salt, function(err, hash) {
//                     var data = {
//                         password: hash
//                     }
//                     models.sequelize.query('UPDATE users SET ? WHERE email ="' + result[0].email + '"', data, function(err, result) {
//                         if(err) throw err                   
//                     });
//                     });
//                 });
//             type = 'success';
//             msg = 'Your password has been updated successfully';                
//         } else {
//             console.log('2');
//             type = 'success';
//             msg = 'Invalid link; please try again';

//             }

//         req.flash(type, msg);
//         res.redirect('/');
//     });
// }

module.exports = {
    handleLogin: handleLogin,
    handleSignup: handleSignup,
    // passwordReset: passwordReset,
    // updatePassword: updatePassword,
    handleGetAllUsers: handleGetAllUsers,
    handleDeleteUser: handleDeleteUser,
    handleEditUser: handleEditUser,
    getAllCode: getAllCode
}