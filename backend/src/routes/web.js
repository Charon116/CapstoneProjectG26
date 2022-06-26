import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import doctorController from "../controllers/doctorController";
import verifySignUp from "../middleware/verifySignUp";
import passwordReset from "../controllers/passwordReset";
let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", homeController.getHomePage);
    
    router.get('/crud', homeController.getCrudPage);
    router.post('/post-crud', homeController.postCRUD);
    
    router.post('/api/login', userController.handleLogin);
    router.post('/api/signup', [verifySignUp.checkDuplicatedEmail], userController.handleSignup);
    router.get('/api/get-all-users',userController.handleGetAllUsers);
    router.delete('/api/delete-user', userController.handleDeleteUser);
    router.put('/api/edit-user', userController.handleEditUser);

    router.get('/api/allcode', userController.getAllCode);

    router.get('/api/top-doctor-home',doctorController.getTopDoctorHome);
    router.get('/api/get-all-doctor',doctorController.getAllDoctors);
    router.post('/api/save-infor-doctor',doctorController.postInforDoctor);
    router.get('/api/get-detail-doctor-by-id', doctorController.getDetailDoctorById);
    router.post('/api/bulk-create-schedule',doctorController.bulkCreateSchedule);
    router.get('/api/get-schedule-doctor-by-date', doctorController.getScheduleByDate);
    router.get('/api/get-extra-infor-doctor-by-id', doctorController.getExtraInforDoctorById);
    // router.post('/reset-password-email', userController.passwordReset);
    // router.post('/update-password',userController.updatePassword)

    return app.use("/", router)
}

module.exports = initWebRoutes;