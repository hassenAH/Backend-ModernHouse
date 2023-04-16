import Product from"../models/Product.js";
import Cart from "../models/Cart.js";
import User from "../models/user.js";
import moment from "moment/moment.js";

export async function addOnce (req, res){
  let date_ob = new Date()
      try {
        const product = await Product.findOne({ _id: req.body.idproduct })
        const user = await User.findOne({ _id: req.body.idUser })
        if (!product) {
          return res.status(404).json({ message: 'Product not found' });
        }
    
        const cart = await Cart.findOne({user: [user._id]});
        if (!cart) {
          const newCart = new Cart({
            user: [user._id],
            products: [product._id],
            quantity: 1,
            etat: "Order",
            date: date_ob.toISOString().slice(0,10)
          });
          product.quantity--; 
          await newCart.save();
           
          return res.status(201).json(newCart);
        }
    
        if (cart.products.includes(product._id)) {
          cart.quantity++;
          product.quantity--;    
              } 
    
        cart.products.push(product._id);
        await product.save();
        await cart.save();
        res.json(cart);
      } catch (err) {
        res.status(500).json({ error: err });
      }
}
export async function deleteone(req, res){

  const cart = await Cart.findById({ _id: req.body._id });
  if (!cart) {
    return res.status(404).send('Cart not found');
  }
  const cartProductIndex = cart.products.findIndex(p => p.productId == req.params.productId);
  if (cartProductIndex === -1) {
    return res.status(404).send('Product not found in cart');
  }
  
  // Supprimer le produit du panier
  const cartProduct = cart.products[cartProductIndex];
  if (cartProduct.quantity > 1) {
    cart.quantity--;
  } else {
    cart.products.splice(cartProductIndex, 1);
  }
  
  // Enregistrer les modifications du panier
  await cart.save();
  
  res.send('Product removed from cart');

}
export async function total(req, res){
  const cart = await Cart.findById({ _id: req.body._id })
  if (!cart) {
    return res.status(404).send('Cart not found');
  }
  
  // Calculer la somme total du montant du panier 
  let totalAmount = 0;
  
  for (var cartProduct of cart.products) {
    var product = await Product.findById(cartProduct._id);
    if (product) {
      totalAmount = totalAmount + product.price;
       
      
    }
  }
  
  res.send({totalAmount});
}

export async function CardsBymonth(req,res){

    await  Cart.find({
      createdAt: { $gte: new Date(new Date().getFullYear(), 0, 1) } // get users registered on or after Jan 1 of the current year
    }).sort({ createdAt: 1 })
.then(docs=>{
  const months = {};
     docs.forEach(cart => {
      const CartMonth = cart.createdAt.getMonth() + 1;
      if (!months[CartMonth]) {
        months[CartMonth] = [];
      }
      months[CartMonth].push(cart);
    });
      res.status(200).json({message: 'cart :', months});
  })
  .catch(err=>{
      res.status(500).json({error:err});
  });
}
export async function getAll  (req, res) {
  try {
    const carts = await Cart.find({ etat: { $in: ['Order', 'Picking inventory','Sorting','Packing'] } }).populate("user");
<<<<<<< Updated upstream
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}
export async function getAllcommanade  (req, res) {
  try {
    const carts = await Cart.find({ });
=======
>>>>>>> Stashed changes
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}
export async function DeletebyId (req, res) {
  
  let cart = await Cart.findById(req.body._id)
  if (cart) {
    await cart.remove()
    return res.send({ message: "cart   " + cart._id + " have been deleted" })
  } else {
    return res.status(404).send({ message: "cart does not exist" })
  }

}
export async function getbyid (req, res) {
  try {
    const cart = await Cart.findOne({ user: req.body.idUser  }).populate("products");
    res.status(200).json(cart);
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
<<<<<<< Updated upstream

=======
export async function countLastWeekUsers(req,res) {
    
  const now = new Date();
  const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const lastWeekStr = lastWeek.toISOString(); // convert date object to string
  const start= lastWeek.toISOString() // format as ISO date string
  const  end = now.toISOString()
    try {
      const carts = await User.find({ created_at: {  $gte: ISODate((start)),
        $lt: ISODate(end) } })
      res.status(200).json(carts);
    } catch (err) {
      res.status(500).json({ error: err });
    } 
}
async function countLastWeekUsers2() {
  const now = moment();
  const lastWeek = moment().subtract(7, 'days');
  const query = { created_at: { $gte: lastWeek.toDate(), $lte: now.toDate() } };

  const count = await User.countDocuments(query);

  return count;
}
export async function count(req,res) {
  const count = await countLastWeekUsers2();
  try{res.send(`There were ${count} new users registered in the last week.`);}catch (err) {
    res.status(500).json({ error: err });
  } 
  
}
export async function getMaxProductSales(req, res) {
  try {
    const sales = await Cart.aggregate([
      { $unwind: "$products" },
      { $group: { _id: "$products", totalSales: { $sum: "$quantity" } } },
      { $sort: { totalSales: -1 } },
      { $limit: 1 }
    ]);
    
    if (sales.length === 0) {
      return res.status(404).json({ message: "No sales found" });
    }
    
    const maxSales = sales[0];
    const product = await Product.findById(maxSales._id);
    
    return res.status(200).json({
      product,
      totalSales: maxSales.totalSales
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
export async function getProductSales(req,res) {
  try {
    const productSales = await Cart.aggregate([
      {
        $unwind: "$products"
      },
      {
        $group: {
          _id: "$products",
          totalSales: { $sum: "$quantity" }
        }
      },
      {
        $sort: { totalSales: -1 }
      }
    ]);
    
    return res.status(200).json({
      productSales
    });
   
  } catch (error) {
    console.error(error);
    throw error;
  }
}
>>>>>>> Stashed changes
