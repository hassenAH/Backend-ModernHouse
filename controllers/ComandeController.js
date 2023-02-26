import Product from"../models/Product.js";
import Cart from "../models/Cart.js";
import User from "../models/user.js";
export async function addOnce (req, res){
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
  const cartProduct = Cart.products[cartProductIndex];
  if (cartProduct.quantity > 1) {
    Cart.quantity--;
  } else {
    Cart.products.splice(cartProductIndex, 1);
  }
  
  // Enregistrer les modifications du panier
  await Cart.save();
  
  res.send('Product removed from cart');

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
  
  res.send({"total = ":totalAmount});
}

export async function getAll  (req, res) {
  try {
    const carts = await Cart.find({});
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
  res.send({ cart: await Cart.findById(req.body._id) })
  console.log(req.body._id)
}