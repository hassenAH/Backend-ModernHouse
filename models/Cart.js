import mongoose from "mongoose"; 
const {Schema,model} = mongoose;

const CartSchema = new Schema({
  user:[{ type: Schema.Types.ObjectId, ref: 'User' }],
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  paid: {type: Boolean, default: false},
  quantity: { type: Number },
  total:{type:Number},
  date: { type: Date },
  etat: { type: String,
    enum: {
      values: ['Order', 'Picking inventory','Sorting','Packing','Shipping','Shipped'
      ,'Returned'],
    } },

},

{
    timestamps:true
});


export default model("Cart",CartSchema);