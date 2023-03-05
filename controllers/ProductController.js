import Product from "../models/Product.js";
import ProductPanel from "../models/ProductPanel.js";
import User from "../models/user.js";
export async function addOnce (req, res) {
const user = await User.findOne({ _id: req.body.idUser })
await  Product.create({
    productname: req.body.productname,
    image: `${req.file.filename}`,
      price: req.body.price,
      hor: req.body.hor,
      ver: req.body.ver,
      surf: req.body.surf,
      quantity: req.body.quantity,
      category: req.body.category,
      description: req.body.description,
      user: req.body.user

      
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
      category: newProduct.category,
      description: newProduct.description,
      user: newProduct.user
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}
export async function getProductsByUserId(req, res) {
  try {
    const products = await Product.find({ user: req.body.user});
    console.log(`Products: ${products}`);
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
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
      category: req.body.category,
      description: req.body.description
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
      category: req.body.category,
      description: req.body.description

      
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


