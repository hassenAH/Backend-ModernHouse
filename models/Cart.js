import mongoose from "mongoose"; 
const {Schema,model} = mongoose;

const CartSchema = new Schema({
  user:[{ type: Schema.Types.ObjectId, ref: 'User' }],
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  quantity: { type: Number },
  date: { type: Date },
  etat: { type: String,
    enum: {
      values: ['Order', 'Picking inventory','Sorting','Packing','Shipping'],
    } },

});


export default model("Cart",CartSchema);