import Rate from "../models/Rate.js";
import User from "../models/user.js";
export async function addOnce(req, res){
    const user = await User.findOne({ _id: req.body.idUser })
    await Rate.create({
        product_id: req.body.product_id,
        rate: req.body.rate,
        feedback: req.body.feedback,
        user: req.body.idUser
    }).then((newRate)=>{
        res.status(200).json({
            product_id: newRate.product_id,
            rate: newRate.rate,
            feedback: newRate.feedback,
            user: newRate.user
        });
    }).catch((err) => {
        res.status(500).json({ error: err });
    });
}


export async function getRatingsByProductId(req, res) {

    try {
        const Ratings = await Rate.find({ product_id: req.body.product_id});
        // console.log(`Products: ${products}`);
        const sum = Ratings.reduce((acc, val) => acc + val.rate, 0)
        const avg = Math.round((sum / Ratings.length)*100) / 100
        res.status(200).json({Ratings, 'sum': avg});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}



