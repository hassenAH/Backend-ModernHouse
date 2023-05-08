import Product from"../models/Product.js";
import Cart from "../models/Cart.js";
import User from "../models/user.js";
import Livreur from "../models/Livreur.js";
import moment from "moment/moment.js";

export async function addOnce (req, res){
  let date_ob = new Date()
      try {
        const cart = await Cart.findOne({ _id: req.params.idcart })
        const user = await User.findOne({ _id: req.params.idUser })
        const livreur = await Livreur.findOne({user: [user._id]});
        
        if (!livreur) {
          const newlivreur = new Livreur({
            user: [user._id],
            cart: [cart._id],
            date: date_ob.toISOString().slice(0,10)
          });
          await newlivreur.save();
          await Cart.findOneAndUpdate({ _id: req.params.idcart }, { etat: "Shipping" });
          return res.status(201).json(newlivreur);
        }
        livreur.cart.push(cart._id);
        cart.etat = "Shipping"; // set cart.etat to "Shipping"
    await cart.save();
        await livreur.save();
        res.json(livreur);
      } catch (err) {
        res.status(500).json({ error: err });
      }
}
export async function total(req, res){
  const cart = await Cart.findById({ _id: req.body._id })
  if (!cart) {
    return res.status(404).send('Cart not found');
  }
  
  // Calculer la somme totale du montant du panier
  let totalAmount = 0;
  var total = 0;
  for (var cartProduct of cart.products) {
    var product = await Product.findById(cartProduct._id);
    if (product) {
      totalAmount = totalAmount + product.price;
       
      
    }
  }
  
  res.send({totalAmount});
}

export async function DeletebyId (req, res) {
  
  let livraison = await Livreur.findById(req.body._id)
  if (livraison) {
    await livraison.remove()
    return res.send({ message: "livraison" + livraison._id + " have been deleted" })
  } else {
    return res.status(404).send({ message: "livreur does not exist" })
  }

}
export async function getbyid (req, res) {
  try {
    const livraison = await Livreur.findOne({ user: req.body.idUser}).populate({
        path: "cart",
        populate: {
          path: "user",
          select: "adress telephone_number username",
        },
        match: { etat: "Shipping" },
      }).select("-__v").lean();

    res.status(200).json(livraison);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}
export async function getbyidShipped (req, res) {
    try {
      const livraison = await Livreur.findOne({ user: req.body.idUser}).populate({
          path: "cart",
          populate: {
            path: "user",
            select: "adress telephone_number username",
          },
          match: { etat: "Shipped" },
        }).select("-__v").lean();
  
      res.status(200).json(livraison);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
  export async function getbyidReturned (req, res) {
    try {
      const livraison = await Livreur.findOne({ user: req.body.idUser}).populate({
          path: "cart",
          populate: {
            path: "user",
            select: "adress telephone_number username",
          },
          match: { etat: "Returned" },
        }).select("-__v").lean();
  
      res.status(200).json(livraison);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
  export async function getbyidArchived (req, res) {
    try {
      const livraison = await Livreur.findOne({ user: req.body.idUser}).populate({
          path: "cart",
          populate: {
            path: "user",
            select: "adress telephone_number username",
          },
          match: { etat: { $in: ["Shipped", "Returned"] } },
        }).select("-__v").lean();
  
      res.status(200).json(livraison);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
export async function changeEtat(req, res) {
  try {
    const { _id, etat } = req.params;

    // Find the commande by its _id
    const commande = await Cart.findOne({ _id });

    // Update the etat value
    commande.etat = etat;

    // Save the updated commande
    await commande.save();

    res.status(200).send({ message: 'Etat updated successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error.' });
  }
}
export async function getbyidcard (req, res) {
  try {
    const _id = req.params;
    const cart = await Cart.findOne({_id}).populate("products").populate("user");
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}
export async function getShippingCarts(req, res) {
  try {
    const carts = await Cart.find({ etat: "Shipping" }).populate("user");
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}
export async function getPackingCarts(req, res) {
  try {
    const carts = await Cart.find({ etat: "Packing" }).populate("user");
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}
export async function getShippedAndReturnedCarts(req, res) {
  try {
    const carts = await Cart.find({ etat: { $in: ["Shipped", "Returned"] } }).populate("user");
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

