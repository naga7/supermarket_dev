const user_model = require("../../database/models/user.model")
const helper =require("../helpr")


class user{/////////////////////all user///////////////////////////////
        static all = async(req,res)=>{
                try{
                    const userData = await user_model.find()
                    helper.resHandler(res, 200, true, userData, "users featched")
                }
                catch(e){
                    helper.resHandler(res, 500, false, e.message, "Error featch data")
                }
            }
        //===================================register====================
static register = async (req,res)=>{
        try {
                const user_data = new user_model(req.body)
                await user_data.save()
            //    res.status(404).send({ apiStatus: true, data:user_data, message:"successfull url" })
               helper.resHandler(res, 200, true, user_data, "register is successfull")
        }catch(e){
               helper.resHandler(res,500,false,e,"register is fail")
         //   res.status(404).send({ apiStatus: false, data:null, message:"invalid url" })
        }

}
//================================delete account=====================
static delete_account = async (req,res)=>{
        try {
                const user_data = await user_model.findByIdAndDelete(req.params.id)
               
               helper.resHandler(res, 200, true, user_data, "delete account is successfull")
        }catch(e){
               helper.resHandler(res,500,false,e.massage,"delete account is fail")
        }

}
//===================================edite account ======================
static edit_account = async (req,res)=>{
        try {
                const user_data = await user_model.findById(req.params.id)
                console.log(user_data)
                for(let key in req.body){
                        user_data[key]=req.body[key]
                }
                await user_data.save()
               
               helper.resHandler(res, 200, true, user_data, "edit account is successfull")
        }catch(e){
               helper.resHandler(res,500,false,e.massage,"edit account is fail")
        }

}
//================================= login user account==================
static login_user = async(req, res)=>{
        try{
           const userData = await user_model.loginMe(req.body.email, req.body.password)
           const token = await userData.generateToken()
           helper.resHandler(res,200, true, {userData,token}, "done")
        }
        catch(e){
            helper.resHandler(res, 500, false, e, e.message)
        }
    }
    //===========================================img=============
    static updatePimg = async(req,res)=>{
        try{
            
            const ext = helper.fileHandler(req)
            req.user.image = `${process.env.APPUrl}${req.file.filename}.${ext}`
            await req.user.save()
            helper.resHandler(res, 200, true, req.user, "done")
        }
        catch(e){
            helper.resHandler(res, 500, false, e.message, "Error featch data")
        }
    }
}
module.exports=user