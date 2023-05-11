import Product from "../models/Product.js";
import ProductPanel from "../models/ProductPanel.js";
import User from "../models/user.js";
export async function addOnce (req, res) {
const user = await User.findOne({ _id: req.body.idUser })
await  Product.create({
    productname: req.body.productname,
   /* image: `${req.file.filename}`,*/
      price: req.body.price,
      quantitySales:0,
      height: req.body.height,
      width: req.body.width,
      quantity: req.body.quantity,
      category: req.body.category,
      description: req.body.description,
      user: req.body.user,
      depth: req.body.depth,
      image3D: req.body.image3D,
      item: req.body.item,
      
  })
    .then((newProduct) => {
      res.status(200).json({
        productname: newProduct.productname,
        image: newProduct.image,
      price: newProduct.price,
      quantitySales:0,
      depth: newProduct.depth,
      height: newProduct.height,
      width: newProduct.width,
      quantity: newProduct.quantity,
      category: newProduct.category,
      description: newProduct.description,
      user: newProduct.user,
      image3D: newProduct.image3D,
      item: newProduct.item,

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
      image : req.body.image,
      price: req.body.price,
      quantitySales:0,
      height: req.body.height,
      width: req.body.width,
      quantity: req.body.quantity,
      category: req.body.category,
      description: req.body.description,
      user: req.body.user,
      depth: req.body.depth,
      image3D: req.body.image3D,
      item: req.body.item,
        }
  }
  else {
    newProduct = {
      productname: req.body.productname,
      image: `${req.file.filename}`,
      price: req.body.price,
      quantitySales:0,
      height: req.body.height,
      width: req.body.width,
      quantity: req.body.quantity,
      category: req.body.category,
      description: req.body.description,
      user: req.body.user,
      depth: req.body.depth,
      image3D: req.body.image3D,
      item: req.body.item,
      
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
  
    let product = await Product.findById(req.params.id)
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
export async function sortbyalpha(req, res) {
  const products = await Product.find().sort({ productname: 'asc' });
  res.status(200).json(products);
  
}
export async function sortbypriceasc(req, res) {
  const products = await Product.find({}).sort({ price: 1 });
  res.status(200).json(products);
  
}

export async function sortbypricedes(req, res) {
  const products = await Product.find({}).sort({ price: -1 });
  res.status(200).json(products);
  
}
export const getBestSellingProductsSupplier = async (req, res) => {
  try {
    const products = await Product.find({ user: req.body.user}).sort('-quantitySales').limit(10); // get top 10 products by quantity sold
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getBestSellingProducts = async (req, res) => {
  try {
    const products = await Product.find().sort('-quantitySales').limit(10); // get top 10 products by quantity sold
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
export const getTotalSales = async (req, res) => {
  try {
    const products = await Product.find().select('quantitySales'); // get all products with quantitySales field
    const totalSales = products.reduce((acc, curr) => acc + curr.quantitySales, 0); // calculate the total sales using reduce method
    res.status(200).json( totalSales );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getTotalSalesbySupplier = async (req, res) => {
  try {
    const products = await Product.find({ user: req.body.user}).select('quantitySales'); // get all products with quantitySales field
    const totalSales = products.reduce((acc, curr) => acc + curr.quantitySales, 0); // calculate the total sales using reduce method
    res.status(200).json( totalSales );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export async function countLastsProduct(req,res) {
  
  const lastWeekDate = new Date();
  lastWeekDate.setDate(lastWeekDate.getDate() - 30);
  Product.aggregate([
    {
      $match: {
        createdAt: {
          $gte: lastWeekDate
        }
      }
    },
    {
      $group: {
        _id: null,
        count: {
          $sum: 1
        }
      }
    }
  ]).then(docs =>{
    const count = docs.length > 0 ? docs[0].count : 0;
    res.status(200).json(count);
})
.catch(err=>{
    res.status(500).json({error:err});
});

  

 


}

