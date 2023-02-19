import mongoose from "mongoose"; 
const {Schema,model} = mongoose;

const CartSchema = new Schema({
  user:[{ type: Schema.Types.ObjectId, ref: 'User' }],
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  quantity: { type: Number },
});


export default model("Cart",CartSchema);
