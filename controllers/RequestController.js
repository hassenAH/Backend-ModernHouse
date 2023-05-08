import Request from "../models/Request.js";
import User from "../models/user.js";
import Product from "../models/Product.js";
import Cart from "../models/Cart.js";

export async function addOnce (req, res) {
        const user = await User.findOne({_id: req.body.user})

        const newRequest = new Request({
            productname:req.body.productname ,
            description:req.body.description,
            link:"",
            status: 0,
            image:req.body.image,
            user:req.body.user,
        });
        await newRequest.save();

        return res.status(201).json(newRequest);


}
export async function getRequestsByUserId(req, res) {
    try {
        const request = await Request.find({ user: req.body.user});
        console.log(`Products: ${request}`);
        res.status(200).json(request);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
export async function getAll  (req, res) {
    try {
        const requests = await Request.find({});
        res.status(200).json(requests);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}
export async function DeletebyId (req, res) {

    let product = await Request.findById(req.params.id)
    if (product) {
        await product.remove()
        return res.send({ message: "product" + product._id + " have been deleted" })
    } else {
        return res.status(404).send({ message: "Req does not exist" })
    }

}

export async function Update (req, res) {
    const name = req.body.productname;
    const newPrice = req.body.link;
    const status = req.body.status;

    await Request.findOneAndUpdate({ productname: name }, { link: newPrice,status : status });

    return res.send('Product price updated');

}