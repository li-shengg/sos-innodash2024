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


// Routes
router.post("/login", userController.login, bcryptMiddleware.comparePassword, jwtMiddleware.generateToken, jwtMiddleware.sendToken);
// router.post("/register", userController.checkUsernameOrEmailExist, bcryptMiddleware.hashPassword, userController.register);
router.get("/verify",jwtMiddleware.verifyToken)

module.exports=router;