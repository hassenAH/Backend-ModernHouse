import User, { loginValidate, userValidate } from '../models/user.js';
import { body, validationResult } from 'express-validator';
import verifymail from "../controllers/template/templates.js"
import sendEmail from "../middlewares/nodemail.js"
import resetpassword from "../controllers/template/codetemplate.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import otpGenerator from "otp-generator";
import Cart from '../models/Cart.js';
export async function getAll(req,res){
    await User
    .find({})
    .then(docs=>{
        res.status(200).json(docs)
    })
    .catch(err=>{
        res.status(500).json({error:err});
    });
}
export async function somme(req,res){
  await User
  .find({})
  .then(docs=>{
      res.status(200).json(docs)
  })
  .catch(err=>{
      res.status(500).json({error:err});
  });
}
export async function uploadImage(req,res){
    await User
    .findOne({ _id: req.params.id })
    .then(docs=>{
        docs.Image=`${req.file.filename}`;
        docs.save();
        res.status(200).json(docs);
    })
    .catch(err=>{
        res.status(500).json({error:err});
    });
}

export async function profile(req,res){
    const profile = await User.findById(req.user._id).select('-password');
    res.send(profile);
}

export async function register(req,res){
    const {error} =  userValidate(req.body);

    if(error){
        return res.status(400).send(error.details[0].message);
    }

    let user = await User.findOne({email: req.body.email})

    if(user)
    {
        return res.status(404).send('Email already exists')
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    await User
    .create({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        role: "user",
        Image:"",
        verified: false,
        banned:false,
    })
    .then(docs=>{
        
      
        res.status(200).json({message: 'User Added Successfully!', docs});
    })
    .catch(err=>{
        res.status(500).json({error:err});
    });
    const u = await User.findOne({
      email:req.body.email});
    var message = `${u.id}`;
    var name =  u.username;
    var v = await verifymail(name,message);
        sendEmail( u.email, "Verify Email", v);
    
}

export async function login(req,res){

    const {error} = loginValidate(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    let user = await User.findOne({email: req.body.email})
    if(!user)
    {
        return res.status(404).send('Invalid email or password')
    }

    const checkPassword = await bcrypt.compare(req.body.password, user.password);
    if(!checkPassword)
    {
        return res.status(404).send('Invalid email or password');
    }

    const token = jwt.sign({_id:user._id}, 'privateKey')
    res.header('x-auth-token',token).status(200).send(user);

}

export async function getOnce(req,res){

    await User
    .findById(req.params.id)
    .then(docs =>{
        res.status(200).json(docs);
    })
    .catch(err=>{
        res.status(500).json({error:err});
    });
}

export async function patchOnce(req,res){

    await User
    .findByIdAndUpdate(req.params.id, req.body)
    .then(docs=>{
     res.status(200).json(docs);
    })
    .catch(err=>{
     res.status(500).json({error:err});
    });

}

export async function deleteOnce(req,res){
    await User
    .findByIdAndRemove(req.params.id)
    .then(docs=>{
     res.status(200).json(docs);
    })
    .catch(err=>{
     res.status(500).json({error:err});
    });
}
export async function resetPass(req,res){
  
    var user = await User.findOne({
      email:req.body.email});
  
      if(!user)
        res.send({
          msg:'user not found'
        })
      
        var a = otpGenerator.generate(4, { digits:true,lowerCaseAlphabets : false, upperCaseAlphabets: false, specialChars: false });
        user.code = a;
        user.save();
        var message =user.code;
        const name = user.username;
      const v = await resetpassword(name,message);
          sendEmail(user.email, "Reset Password Email", v);
        
        res.send({
          msg:'email sent'
        })
        
      
      
      
  
  }
  export async function forgetPass(req,res){
    try {
      const user = await User.findOne({ code:req.body.code });
      if(user)
      {
        
        res.status(200).json("code valide ")
      }
      else
      [
        res.status(400).json("invalide code ")
      ]
      
     
     
  
      
    } catch (error) {
      console.log(error);
    }
  }
  export async function changepass(req,res){
    try {
      const user = await User.findOne({ email:req.body.email.toLowerCase() });
      if(user)
      {
        

        var password=req.body.password;
        const  encryptedPassword = await bcrypt.hash(password, 10);
        user.password=encryptedPassword;
        user.code="";
        user.save();
        res.send("password change sucessfully");
      }
      
     
     
  
      
    } catch (error) {
      console.log(error);
    }
  }
  export async function FindCommande(req,res){

    var user = await User.findOne({ _id: req.params.id });
    if(user)
    {
      var id = req.params.id
     
      var commandes = await Cart.find({user: [user._id]})
      try{
  
      
      if(commandes)
      {
        res.status(200).json(commandes)
      }else
      res.status(404).json("user dont have commandes")
    } catch (error) {
      console.log(error);
    }
    }
  
     
     // res.status(404).json("Not found ")
  }
  export async function verify(req,res){
    try {
      var user = await User.findOne({ _id: req.params.id });
      user.verified = true;
      user.save();
     
     
  
      res.send("email verified sucessfully");
    } catch (error) {
      console.log("prob");
    }
  }
  export async function ban(req,res){
    try {
      var user = await User.findOne({ _id: req.params.id });
      user.banned = true;
      user.save();
     
     
  
      res.send("user banned sucessfully");
    } catch (error) {
      console.log("prob");
    }
  }
  
  export async function unban(req,res){
    try {
      var user = await User.findOne({ _id: req.params.id });
      user.banned = false;
      user.save();
     
     
  
      res.send("user banned sucessfully");
    } catch (error) {
      console.log("prob");
    }
  }
  export async function registerFourniseur(req,res){
   

   

    let user = await User.findOne({email: req.body.email})

    if(user)
    {
        return res.status(404).send('Email already exists')
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    await User
    .create({
        email: req.body.email,
        password: hashedPassword,
        role: "Fournisseur",
        Image:"",
        verified: false,
        banned:false,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        company_name: req.body.company_name,
        code_fiscal: req.body.code_fiscal,
        telephone_number:  req.body.telephone_number,
        categorie:  req.body.categorie

    })
    .then(docs=>{
        res.status(200).json({message: 'User Added Successfully!', docs});
    })
    .catch(err=>{
        res.status(500).json({error:err});
    });
   /* const u = await User.findOne({
      email:req.body.email});
    var message = `${u.id}`;
    var name =  u.last_name +" "+u.first_name ;
    var v = await verifymail(name,message);
        sendEmail( u.email, "Verify Email", v);*/
    
}