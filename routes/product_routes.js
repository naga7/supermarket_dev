
const product_controller = require("../app/controllr/product_control")
//const auth = require("../app/middleware/auth.middleware")
const router = require("express").Router()

router.post("/addproduct",  product_controller.add_product)

router.get("/", product_controller.all_product)
router.delete("/delete", product_controller.delAllproduct)

router.get("/myproduct", product_controller.myproducts)

router.get("/single/:id", product_controller.Singleproduct)
router.delete("/deleteProduct/:id", product_controller.delete_product)
router.patch("/editproduct/:id",  product_controller.edit_product)

module.exports=router