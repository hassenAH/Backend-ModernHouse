import Product from "../models/Product.js";
import User from "../models/user.js";
import Wish from "../models/WishList.js";

export async function addWish (req, res) {
  try {
        
    const product = await Product.findOne({ _id: req.body.idproduct })
    const user = await User.findOne({ _id: req.body.idUser })
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const wish = await Wish.findOne({user: [user._id]});
    if (!wish) {
      const newWishList = new Wish({
        user: [user._id],
        products: product,
      });
      await newWishList.save();
       
      return res.status(201).json(newWishList);
    }

    if (wish.products.includes(product._id)) {
      return { success: false, message: 'Product already added to wishlist' };  
          } 

    wish.products.push(product);
    await product.save();
    await wish.save();
    res.json(wish);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}
export async function deletewish(req, res){

  const wish = await Wish.findById({ _id: req.body._id });
  if (!wish) {
    return res.status(404).send('Wish List not found');
  }
  const wishProductIndex = wish.products.findIndex(p => p.productId == req.params.productId);
  if (wishProductIndex === -1) {
    return res.status(404).send('Product not found in wishList');
  }
  
  // Supprimer le produit du panier
  
  
  wish.products.splice(wishProductIndex, 1);
  
  
  // Enregistrer les modifications du panier
  await wish.save();
  
  res.send('Product removed from WishList');

}
export async function getwishList  (req, res) {
  try {
    const wishs = await Wish.find({});
    res.status(200).json(wishs);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

export async function getwishbyid (req, res) {
  try {
    const wish = await Wish.findOne({ user: req.body.idUser }).populate("products");
    res.status(200).json(wish);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}