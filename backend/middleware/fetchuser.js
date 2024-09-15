const jwt=require("jsonwebtoken")
const JWT_token="Gravityexplosion";

const fetchuser=(req,res,next)=>{
    const token=req.header("auth-token")
    console.log("Request Headers:", req.headers);
    if(!token){
        res.status(407).send({error:"access denied"})
    }
    try {
        const data=jwt.verify(token,JWT_token)
        console.log("Decoded JWT data:", data);
        req.user=data.User;
        next();   
    } catch (error) {
        console.error(error.message)
        res.status(405).send({error:"access denied is true"})
    }

}
module.exports=fetchuser;