import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import verifySignUp from "../middleware/verifySignUp";
let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", homeController.getHomePage);
    
    router.get('/crud', homeController.getCrudPage);
    router.post('/post-crud', homeController.postCRUD);
    
    router.post('/api/login', userController.handleLogin);
    router.post('/api/signup', [verifySignUp.checkDuplicatedEmail], userController.handleSignup);

    return app.use("/", router)
}

module.exports = initWebRoutes;