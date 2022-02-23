const router=require("express").Router();
const authUser = require("./authUser");
const User=require("./userModel");
router.post("/users",async (req,res)=>{
    try {
    const user=await User.create(req.body);
    await user.generateToken();
      res.send(user);  
    } catch (error) {
        res.status(500).send()
    }
})

router.post("/login",async (req,res)=>{
    const {email,password}=req.body;
    try {
       console.log(email,password) 
      const user=await User.findByCredentials(email,password);
      await user.generateToken();
      res.status(200).send(user);  
    } catch (error) {
        console.log(error);
        res.status(500).send()
    }
})

router.post("/auto-login",authUser, async (req,res)=>{
res.send(req.user);
})

router.post("/logout", authUser , async (req,res)=>{
const user=req.user;
user.token="";
await user.save();
res.status(200).send();
})

router.post("/add-favorites",authUser, async (req,res)=>{
    const {mealId}=req.body;
    const user=req.user;
    user.favorites.push(mealId);
    await user.save();
    res.status(200).send(user);
})

router.post("/remove-favorites",authUser, async (req,res)=>{
    const {mealId}=req.body;
    const user=req.user;
    user.favorites=user.favorites.filter((id)=>id!==mealId);
    await user.save();
    res.status(200).send(user);
})

module.exports=router;