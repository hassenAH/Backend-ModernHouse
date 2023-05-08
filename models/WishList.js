import mongoose from "mongoose"; 
const {Schema,model} = mongoose;

const WishSchema = new Schema({
  user:[{ type: Schema.Types.ObjectId, ref: 'User' }],
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
});


export default model("WishList",WishSchema);