const express=require("express")
const User=require("../models/User")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const fetchuser=require("../middleware/fetchuser")
const router=express.Router()
const {body,validationResult}=require("express-validator")

//Router 1 create user
router.get('/createuser',[
    body("Email","Enter a valid Email").isEmail(),
    body("Password","Password must be atleast 5 characters").isLength({min:5}),
    body("Name","Enter a valid name").isLength({min:3})

],async (req,res)=>{
    // console.log(req.body)
    // const user=User(req.body);
    // user.save();
    // res.send(req.body)
    const JWT_token="Gravityexplosion";
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
        let user=await User.findOne({Email:req.body.Email})
    if(user){
        return res.status(400).json({error:"This Email id user is already exist"})
    }
    const salt=await bcrypt.genSalt(10)
    const secure=await bcrypt.hash(req.body.Password,salt);
    user=await User.create({
        Name: req.body.Name,
        Email: req.body.Email,
        Password: secure,
    })
    const data={
        User:{
            id:user.id
        }
    }
    const authtoken=jwt.sign(data,JWT_token)
    res.json({authtoken})
    } catch (error) {
        console.error(error.message)
        res.status(500).send("some error occured")
    }
})

//Route 2 login
router.get('/login',[
    body("Email","Email can't be blank").exists(),
    body("Password","Password can't be blank").exists(),

],async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({ errors: errors.array() });
    }
    const JWT_token="Gravityexplosion";
    const {Email,Password}=req.body;
    try {
       let user = await User.findOne({Email})
       if(!user){
        return res.status(404).json({error:"Sorry! this user is not exist"})
       } 
       const comparepassword=await bcrypt.compare(Password,user.Password)
       if(!comparepassword){
        return res.status(404).json({error:"Sorry! this user is not exist"})
       }
       const data={
        User:{
            id:user.id
        }
    }
    const authtoken=jwt.sign(data,JWT_token)
    res.json({authtoken})
    } catch (error) {
        console.error(error.message)
        res.status(500).send("login error error occured")
    }

})

router.post('/getuser',fetchuser,async (req,res)=>{
    console.log("req.user:", req.user);
    try {
       const userid=req.user.id;
       const user =await User.findById(userid).select("-Password")
       res.send(user)
    } catch (error) {
        console.error(error.message)
        res.status(501).send("not found")
    }

})
module.exports=router;