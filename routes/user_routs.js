const router = require("express").Router()
const user_controller = require("../app/controllr/user_control")
router.get("/",user_controller.all)
router.post("/register",user_controller.register)
router.get("/delete_account/:id",user_controller.delete_account)
router.get("/edit_account/:id",user_controller.edit_account)
router.get("/login_account",user_controller.login_user)
module.exports= router