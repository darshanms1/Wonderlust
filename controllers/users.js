
const User = require("../models/user.js");


module.exports.renderSignup=(req,res)=>{
    res.render("users/signup.ejs");
}


module.exports.signup=async(req,res)=>{
    try{
    let {username,email,password }=req.body;
    const newUser = new User({email,username});
    const registredUser =await User.register(newUser,password);
    console.log("registredUser");
    //user signup it auomatically login also happen
    req.login(registredUser,(err)=>{
        if(err){
            return next(err);
        }
         req.flash("success","Welcome to Wanderlast");
    res.redirect("/listings");
    })
   
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }

}
module.exports.renderLogin=(req,res) =>{
    res.render("users/login.ejs");
}

module.exports.login=async (req,res) =>{
        req.flash("success","welcome to Wonderlist! your loged in");
        let redirectUrl =res.locals.redirectUrl || "/listings";
        res.redirect(redirectUrl);

    }

module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
        return next(err);
    }
    req.flash("success","you are loged out!");
    res.redirect("/listings");
});
}