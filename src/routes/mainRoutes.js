const express=require('express');
const router = express.Router();

const carRoutes=require("./carRoutes")
const userRoutes=require("./userRoutes")

router.use("/cars",carRoutes)
router.use("/users",userRoutes)


// Login and Register Routes
// Controller export
const userController=require("../controllers/usercontrollers")
const bcryptMiddleware=require("../middlewares/bcryptMiddleware")
const jwtMiddleware=require("../middlewares/jwtMiddleware")
const AI=require("../middlewares/AI_Model")


// Routes
router.post("/login", userController.login, bcryptMiddleware.comparePassword, jwtMiddleware.generateToken, jwtMiddleware.sendToken);
router.post("/register", userController.checkUsernameExist, bcryptMiddleware.hashPassword, userController.register,jwtMiddleware.generateToken, jwtMiddleware.sendToken);
router.get("/verify",jwtMiddleware.verifyToken)
router.post("/AI_classify",AI.funcall)

//Optional: For classifying car model type.
const AI2=require("../middlewares/AI_Model2")
router.post("/AI_identify",AI2.classify)

module.exports=router;