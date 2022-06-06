import CRUDService from '../services/CRUDService'
import db from '../models/index';
let getHomePage = (req, res) => {
    return res.send("Hello World!");
}

const getCrudPage = (req, res) => {
    return res.render('crud.ejs');
}

const postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body)
    return res.send('post crud from server')
}


module.exports = {
    getHomePage: getHomePage,
    getCrudPage: getCrudPage,
    postCRUD: postCRUD
}