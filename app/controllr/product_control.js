const product_model = require("../../database/models/product")
const helper =require("../helpr")


//////////////////////////////

class product{
        
        /////////////////////all product//////////////////////////////
        static all_product = async(req,res)=>{
                try{
                    const productData = await product_model.find()
                    helper.resHandler(res, 200, true, productData, "product featched")
                }
                catch(e){
                    helper.resHandler(res, 500, false, e.message, "Error featch data_product")
                }
            }
        //===================================add product====================
        static add_product = async (req,res)=>{
        try {
                const product_data = new product_model(req.body)
                await product_data.save()
            //    res.status(404).send({ apiStatus: true, data:user_data, message:"successfull url" })
               helper.resHandler(res, 200, true, product_data, "add product is successfull")
        }catch(e){
               helper.resHandler(res,500,false,e.message ,"add product is fail")
         //   res.status(404).send({ apiStatus: false, data:null, message:"invalid url" })
        }

}
        //=============================================================
        static myproducts = async(req,res)=>{
        try{
            // const allTasks = await taskModel.find({userId: req.user._id})
            await req.user.populate("myproduct")
            resHandler(res,200, true, req.user.myproducts, "fetched")
        }
        catch(e){
            resHandler(res,500,false, e, e.message)
        }

    }
//================================delete product=====================
        static delete_product = async (req,res)=>{
        try {
                const product_data = await product_model.findByIdAndDelete(req.params.id)
               
               helper.resHandler(res, 200, true, product_data, "delete product is successfull")
        }catch(e){
               helper.resHandler(res,500,false,e.massage,"delete product is fail")
        }

}
//===================================edite product ======================
        static edit_product = async (req,res)=>{
        try {
                const product_data = await product_model.findById(req.params.id)
                console.log(product_data)
                for(let key in req.body){
                        product_data[key]=req.body[key]
                }
                await product_data.save()
               
               helper.resHandler(res, 200, true, product_data, "edit product is successfull")
        }catch(e){
               helper.resHandler(res,500,false,e.massage,"edit product is fail")
        }

}
//===================================show single product==================================
static Singleproduct = async(req,res)=>{
        try{
            const Singleproduct  = await product_model.findById(req.params.id)
         helper.resHandler(res,200, true, Singleproduct, "fetched")
        }
        catch(e){
         helper.resHandler(res,500,false, e, e.message)
        }

    }
    //========================delete allproduct=========================================
    static delAllproduct = async(req,res)=>{
        try{
            const allpro = await product_model.deleteMany()
            helper.resHandler(res,200, true, allpro, "fetched")
        }
        catch(e){
        helper.resHandler(res,500,false, e, e.message)
        }
    }
}
module.exports=product