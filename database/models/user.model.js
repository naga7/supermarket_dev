const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const product_Model=require("../../database/models/product")
const user_schema = mongoose.Schema({
first_name :{
        type:String,
        tirm:true,
        require:true,
        lowercase:true,
        minlength:5,
        maxlength:20,

},
last_name :{
        type:String,
        tirm:true,
        require:true,
        lowercase:true,
        minlength:5,
        maxlength:20,
},
email:{
        type:String,
        tirm:true,
        required:true,
        lowercase:true,
        unique:true,
        validate(value){
                if(!validator.isEmail(value)) 
                    throw new Error("invalid email format")
            }
},
password:{
        type:String,
        tirm:true,
        required:true
},
image:{
        type:String
},
phone:{
        type:String,
        tirm:true,
        required:true,
        validate(value){
                if(!validator.isMobilePhone(value, 'ar-EG'))
                    throw new Error("invalid phone number")
            }

},
addresses:[{
        addressName:{
                type:String,
                tirm:true,
                required:true,
                lowercase:true,},
        addressDetailes:{
                type:String,
                tirm:true,
                required:true,
                lowercase:true
        }
        }
]
,tokens:[{
        token:{
                type:String,
                required:true
        }
}]

}
, {
        timestamps:true
})
//=========================
user_schema.pre("findByIdAndDelete", async function(){
        await product_Model.remove({userId:this._id})
    
    })

//===============
user_schema.pre("save",async function(){
        if(this.isModified("password"))
        this.password=await bcrypt.hash(this.password,12)
})
//=============================
user_schema.statics.loginMe =async(email,password)=>{
        const userdata= await userModel.findOne({email})
        if(!userdata) throw new Error ("invalid email ")
        const match = await bcrypt.compare(password,userdata.password)
        if(!match) throw new Error("invalid password")
        return userdata
}
//======================================
user_schema.methods.generateToken= async function(){
        const token = jwt.sign({_id:this._id},process.env.JWTKEY)
        this.tokens=this.tokens.concat({token})
        await this.save()
        return token
}

//=============================================

user_schema.virtual("myproduct", {
        ref:"product",
        localField:"_id",
        foreignField:"userId"
    })
    



const userModel = mongoose.model("user",user_schema)
module.exports=userModel