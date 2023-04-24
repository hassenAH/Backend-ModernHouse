
import Promo from "../models/Promo.js"

import User from "../models/user.js";


export async function addPromo(req , res){
 
 try {
    
    var code  = req.body.code;
    var discount= req.body.discount
    var expirationDate = req.body.expirationDate
    const user = await User.findOne({ _id: req.body.idUser })


    

    // Create user in our database
    var c = await Promo.create({
        code,
        discount,
      expirationDate,
      user: [user._id]
    });
    
      res.status(200).json({message : "ajout avec succeés",c});
      

    
  } catch (err) {
    console.log(err);
  }
  
};



export async function UpdatePromo(req,res){

  const  { code,description,expirationDate } = req.body;
  
  var c = await Promo.findOne({ _id: req.params.id });
  c.code=code;
  c.description= description;
  c.expirationDate= expirationDate;
 
  c.save()
    
  
  res.status(200).json({message : "update avec succeés",c});
   
   // res.status(404).json("Not found ")
    
    
}
export async function disablePromo(req,res){

  
  
  var c = await Promo.findOne({ _id: req.params.id });
  if(c.active)
  {
    c.active = false;
  }
  else
  {
    c.active = true;
  }
  
 
  c.save()
    
  
  res.status(200).json({message : "update avec succeés",c});
   
   // res.status(404).json("Not found ")
    
    
}

export async function deletePromo(req,res){
  
    
      try {
        var  id=req.params.id;
  
        var c = await Case.findOne({_id:id})
        if(!c)
        res.status(404).json("promo not found")

        c.remove();
        res.status(200).json("promo Supprime")
      } catch (error) {
        console.log(error);
      }
  
}
export async function GetPromo(req,res){
  
  
    try {

      var  id=req.params.id;

      var c = await Promo.findOne({_id:id})
      if(c)
      {
       
        res.status(200).json(c)
      }else
      res.status(404).json("user not found")
    } catch (error) {
      console.log(error);
    }

}
export async function GetALLPromo(req,res){
  
  
    try {


      var c = await Promo.find({})
      if(c)
      {
        
        res.status(200).json(c)
      }else
      res.status(404).json("promo not found")
    } catch (error) {
      console.log(error);
    }

}





