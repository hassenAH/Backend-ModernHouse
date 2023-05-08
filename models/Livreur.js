import mongoose from "mongoose"; 
const {Schema,model} = mongoose;

const LivreurSchema = new Schema({
    user:[{ type: Schema.Types.ObjectId, ref: 'User' }],
  cart: [{ type: Schema.Types.ObjectId, ref: 'Cart' }],
  date: { type: Date },
});


export default model("Livreur",LivreurSchema);