import db from '../models/index';
import bcrypt from 'bcryptjs';

let handleUserLogin = (email,password) => {
    return new Promise(async (resolve,reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if(isExist){
                let user = await db.User.findOne({
                    attributes: ['id','email','roleId','password','firstName','lastName','gender','address','phoneNumber'],                    
                    where: {email: email},
                    raw: true
                });
                if(user){
                    let check = await bcrypt.compare(password,user.password)
                    if(check){
                        userData.errCode=0,
                        userData.errMessage= "OK",

                        delete user.password;
                        userData.user = user
                    }else{
                        userData.errCode=3,
                        userData.errMessage= "Password is incorrect";
                    }
                }else{
                    userData.errCode = 2;
                    userData.errMessage = "User not found";
                }
            }else{
                userData.errCode = 1;
                userData.errMessage = `Your email isn't exist in our system`;
            }
            resolve(userData)
        } catch (error) {
            reject(error)
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async(resolve,reject) => {
        try {
            let user = await db.User.findOne({
                where: {email: userEmail}
            })
            if(user){
                resolve(true)
            }else{
                resolve(false)
            }
        } catch (error) {
            reject(error)
        }
    })
}

const salt = bcrypt.genSaltSync(10);

const signUpUser = async (data) => {
    return new Promise(async(resolve,reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender, 
                roleId: 'R3',
            })
            resolve('Sign up success');
            
        } catch (error) {
            reject(error)
        }
    })

}

let hashUserPassword = (password) => {
    return new Promise(async(resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        } catch (error) {
            reject(error)
        }
    })
}

let getAllUsers = (userId) =>{
    return new Promise(async(resolve,reject) =>{
        try{
            let users = '';
            if(userId == 'ALL'){
                users = await db.User.findAll({
                    attributes:{
                        exclude: ['password'] 
                    }
                })
            }
            if(userId && userId != 'ALL'){
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes:{
                        exclude : ['password']
                    }
                })
            }
            resolve(users)
        }catch(e){
            reject(e);
        }
    })
}

let updateUserData = (data)=>{
    return new Promise(async(resolve, reject)=>{
        try{
            if(!data.id || !data.roleId || !data.positionId || !data.gender){
                resolve({
                    errCode: 2,
                    errMessage: ' Missing required parameters'
                })
            }
            let user = await db.User.findOne({
                where: {id:data.id},
                raw: false
            })
            if(user){
                user.firstName= data.firstName,
                user.lastName= data.lastName,
                user.address= data.address;
                user.gender = data.gender;
                user.positionId = data.positionId;
                user.roleId = data.roleId;
                if(data.avatar){                        
                    user.image = data.avatar;
                }
                await user.save();           
            resolve({
                errCode: 0,
                message: 'Update the user succeeds!'
            })

            }else{
                resolve({
                    errCode: 1,
                    errMessage:'User not found!'
                });
            }

        }catch (e){
            reject(e);
        }
    })
}

let deleteUser = (userId) =>{
    return new Promise (async(resolve, reject) =>{
        let foundUser = await db.User.findOne({
            where: { id: userId}
        })
        if(!foundUser){
            resolve({
                errCode: 2,
                errMessage: `The user isn't exist` 
            })
        }
        // if(foundUser){
        // await foundUser.destroy();
        // }
        await db.User.destroy({
            where: { id: userId}
        })
        resolve({
            errCode: 0,
            message: `The user is deleted`

        })

    })
}

let getAllCodeService = (typeInput) => {
    return new Promise(async(resolve, reject) => {
        try {
            if(!typeInput){
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters'
                })
            }else{
                let res = {};
                let allCode = await db.Allcode.findAll({
                    where: {type: typeInput}
                });
                res.errCode = 0;
                res.data = allCode;
                resolve(res);
            }
        } catch (error) {
            reject(error)
        }
    })
}



module.exports = {
    handleUserLogin: handleUserLogin,
    signUpUser: signUpUser,
    getAllUsers: getAllUsers,
    deleteUser: deleteUser,
    updateUserData: updateUserData,
    getAllCodeService: getAllCodeService,
}