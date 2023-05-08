import Position from "../models/Position.js";
import User from "../models/user.js";


export async function addOnce (req, res) {
await  Position.create({
    attitude: req.body.attitude,
      engetude: req.body.engetude,
  })
    .then((newPosition) => {
      res.status(200).json({
        attitude: newPosition.attitude,
        engetude: newPosition.engetude,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

export async function getPositionByUserId(req, res) {
  try {
    const position = await Position.find({ user: req.body.user});
    res.status(200).json(position);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}


export async function putOnce(req, res)
 {
  let newPosition = {};

  newPosition = {
      attitude: req.body.attitude,
      engetude: req.body.engetude,
        }
  
  
  
  Position.findByIdAndUpdate(req.params.id, newPosition)
    .then((doc1) => {
      Position.findById(req.params.id)
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
    const position = await Position.find({});
    res.status(200).json(position);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

export async function getOnce  (req, res) {
  res.send({ position: await Position.findById(req.body.idPosition) })
  console.log(req.body.idPosition)
}

export async function DeletebyId (req, res) {
  
    let position = await Position.findById(req.params.id)
    if (position) {
      await position.remove()
      return res.send({ message: "position" + position._id + " have been deleted" })
    } else {
      return res.status(404).send({ message: "position does not exist" })
    }
  
}

export async function DeleteAll  (req, res) {
    await Position.remove({})
    res.send({ message: "All Position have been deleted" })
  
}

