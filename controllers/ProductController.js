import Product from "../models/Product.js";
import User from "../models/user.js";
import Wish from "../models/WishList.js";
export async function addOnce (req, res) {
await  Product.create({
    productname: req.body.productname,
    image: `${req.file.filename}`,
      price: req.body.price,
      hor: req.body.hor,
      ver: req.body.ver,
      surf: req.body.surf,
      quantity: req.body.quantity,
      description: req.body.description,
      category: req.body.category

      
  })
    .then((newProduct) => {
      res.status(200).json({
        productname: newProduct.productname,
        image: newProduct.image,
      price: newProduct.price,
      hor: newProduct.hor,
      ver: newProduct.ver,
      surf: newProduct.surf,
      quantity: newProduct.quantity,
      description: newProduct.description,
      category: newProduct.category
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}
export async function putOnce(req, res)
 {
  let newProduct = {};
  if(req.file == undefined) {
    newProduct = {
      productname: req.body.productname,
      price: req.body.price,
      image: req.body.image,
      hor: req.body.hor,
      ver: req.body.ver,
      surf: req.body.surf,
      quantity: req.body.quantity,
      description: req.body.description,
      category: req.body.category

    }
  }
  else {
    newProduct = {
      productname: req.body.productname,
      image:`${req.file.filename}`,
      price: req.body.price,
      hor: req.body.hor,
      ver: req.body.ver,
      surf: req.body.surf,
      quantity: req.body.quantity,
      description: req.body.description,
      category: req.body.category
    }
  }
  
  Product.findByIdAndUpdate(req.params.id, newProduct)
    .then((doc1) => {
      Product.findById(req.params.id)
        .then((doc2) => {
          res.status(200).json(doc2);
        })
        .catch((err) => {
          res.status(500).json({ error: err });
        });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}
export async function getAll  (req, res) {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}
export async function getOnce  (req, res) {
  res.send({ product: await Product.findById(req.body.idproduct) })
  console.log(req.body.idproduct)
}
export async function DeletebyId (req, res) {
  
    let product = await Product.findById(req.body._id)
    if (product) {
      await product.remove()
      return res.send({ message: "product" + product._id + " have been deleted" })
    } else {
      return res.status(404).send({ message: "product does not exist" })
    }
  
}
export async function DeleteAll  (req, res) {
    await Product.remove({})
    res.send({ message: "All Products have been deleted" })
  
}

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
        products: [product._id],
      });
      await newWishList.save();
       
      return res.status(201).json(newWishList);
    }

    if (wish.products.includes(product._id)) {
      return { success: false, message: 'Product already added to wishlist' };  
          } 

    wish.products.push(product._id);
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
    const wish = await Wish.findOne({ _id: req.user.idUser });
    res.status(200).json(wish);
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
    const wish = await Wish.findOne({ _id: req.user.idUser });
    res.status(200).json(wish);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

export async function getProductsByCategory(req, res) {
  const category = req.body.category;

  try {
    const products = await Product.find({ category: category });
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}
export async function sortbyalpha(req , res) {
  try {
  const products = await Product.find().sort({ productname: 'asc' });
  res.status(200).json(products);
} catch (error) {
  console.error(error);
  res.status(500).json({ message: "Server Error" });
}
}
export async function sortpriceasc(req , res) {
  try {
  const products = await Product.find().sort({ price: 1 });
  res.status(200).json(products);
} catch (error) {
  console.error(error);
  res.status(500).json({ message: "Server Error" });
}
}
export async function sortpriceades(req , res) {
  try {
  const products = await Product.find().sort({ price: -1 });
  res.status(200).json(products);
} catch (error) {
  console.error(error);
  res.status(500).json({ message: "Server Error" });
}
}
