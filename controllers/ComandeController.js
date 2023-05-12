import Product from"../models/Product.js";
import Cart from "../models/Cart.js";
import User from "../models/user.js";
import moment from "moment/moment.js";
import PDFDocument from "pdfkit";
import nodemailer from "nodemailer"
import fs from "fs"
import path from "path"

export async function addOnce (req, res){
  let date_ob = new Date()
      try {
        const product = await Product.findOne({ _id: req.body.idproduct })
        const user = await User.findOne({ _id: req.body.idUser })
        if (!product) {
          return res.status(404).json({ message: 'Product not found' });
        }
    
        const cart = await Cart.findOne({user: [user._id],paid:false});
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
          product.quantitySales++;    
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
  cart.total = totalAmount;
    await cart.save()
  res.send({totalAmount});
}

export async function CardsBymonth(req,res){

    await  Cart.find({
      createdAt: { $gte: new Date(new Date().getFullYear(), 0, 1) } 
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
      res.status(200).json({months});
  })
  .catch(err=>{
      res.status(500).json({error:err});
  });
}
export async function getAll  (req, res) {
  try {
    const carts = await Cart.find({ etat: { $in: ['Order', 'Picking inventory','Sorting','Packing'] } }).populate("user");

    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}
export async function getAllcommanade  (req, res) {
  try {
    const carts = await Cart.find({ });

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
    const cart = await Cart.findOne({ user: req.body.idUser  }).populate("user").populate('products');
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
export async function getbyidcard(req, res) {
  try {
    const cart = await Cart.findById(req.params._id).populate("user")
      .populate("products");
    res.status(200).json(cart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
  

  try {
    const cart = await Cart.findOne({ user: req.body.idUser  }).populate("user").populate('products');
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
      { $group: { _id: "$products", totalSales: { $sum: "$quantitySales" } } },
      { $sort: { totalSales: +1 } },
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
export async function getProductSales(req, res) {
  try {
    const products = await Product.find({})
      .select('name quantitySales')
      .sort({ quantitySales: -1 });

    return res.json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server Error');
  }
}
const __dirname = path.dirname(new URL(import.meta.url).pathname);

export async function generateAndSendCartPDF(req, res) {
  const { userId } = req.body;
  try {
    const cart = await Cart.findOne({ user: userId })
      .populate('user')
      .populate('products')
      .exec();

    // Fetch the user and cart data
    const user = await User.findById(userId);

    // Create a new PDF document
    const doc = new PDFDocument();

    // Set the document title
    doc.title = 'Commande';

    // Write the user's name and email to the PDF
    doc.text(`Nom: ${user.name}`);
    doc.text(`Email: ${user.email}`);

    // Write the cart items to the PDF
    doc.text('Produits: ');
    cart.products.forEach((product) => {
      doc.text(`${product.name} - ${product.price}`);
    });

    // Calculate and write the total cost to the PDF
    const totalCost = cart.products.reduce((total, product) => {
      return total + product.price;
    }, 0);
    doc.text(`Total: ${totalCost}`);

    // Save the PDF to a file
    const pdfFilePath = path.join('public/images/c.pdf');
    const writeStream = fs.createWriteStream(pdfFilePath);
    doc.pipe(writeStream);

    // Send the PDF as an email attachment
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      pool: true,
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: "chebbiwissal512@gmail.com", // generated ethereal user
        pass: "crwvbumzbfhmdyrz",
      }
    });

    const mailOptions = {
      from: 'chebbiwissal512@gmail.com',
      to: user.email,
      subject: 'Commande',
      text: 'Commande PDF en pièce jointe.',
      attachments: [
        {
          filename: 'commande.pdf',
          path: pdfFilePath
        }
      ]
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send('Une erreur est survenue lors de l\'envoi de l\'email.');
      } else {
        console.log('Email envoyé: ' + info.response);
        res.send('Email envoyé avec succès.');
      }
    });

  } catch (error) {
    console.log(error);
    res.status(500).send('Une erreur est survenue lors de la génération du PDF et/ou l\'envoi de l\'email.');
  }
}





