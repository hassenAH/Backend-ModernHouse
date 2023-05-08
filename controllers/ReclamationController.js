import Reclamation from "../models/Reclamation.js";
import Cart from "../models/Cart.js";
import User from "../models/user.js";
export async function addOnce(req, res){
    const cart = await Cart.findOne({ _id: req.body.idcart })
    if(!cart) {
        return res.status(404).json({ message: 'Commande not found' });
      }
    const user = await User.findOne({ _id: req.body.idUser })
    await Reclamation.create({
        commande_id: cart._id,
        description: req.body.description,
        sujet: req.body.sujet,
        user: user._id
    }).then((newReclamation)=>{
        res.status(200).json({
            commande_id: newReclamation.commande_id,
            description:  newReclamation.description,
            sujet:  newReclamation.sujet,
            user: newReclamation.user
          
        });
    }).catch((err) => {
        res.status(500).json({ error: err });
    });
}
export async function getAll  (req, res) {
    try {
      const reclamation = await Reclamation.find({}).populate("user");
      res.status(200).json(reclamation);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }