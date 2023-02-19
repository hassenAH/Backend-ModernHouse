import User, { loginValidate, userValidate } from '../models/user.js';
import { body, validationResult } from 'express-validator';
import verifymail from "../controllers/template/templates.js"
import sendEmail from "../middlewares/nodemail.js"
import resetpassword from "../controllers/template/codetemplate.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

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
    })
    .then(docs=>{
        var message = `http:// ******//user/verify/${docs.id}`;
    var name = docs.username;
    const v =  verifymail(name,message);
       sendEmail(docs.email, "Verify Email", v);
      
        res.status(200).json({message: 'User Added Successfully!', docs});
    })
    .catch(err=>{
        res.status(500).json({error:err});
    });
    
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
    res.header('x-auth-token',token).status(200).send('Logged In');

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
