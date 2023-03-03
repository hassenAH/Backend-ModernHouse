import mongoose from "mongoose"; 
const {Schema,model} = mongoose;
const ProductSchema = new Schema(
  {
    productname: { type: String },
    image: { type: String },
    description: { type: String },
    price: {type : Number},
    hor: {type : Number},
    ver: { type: Number },
    surf: { type: Number },
    quantity: { type: Number },
    category: {
      type: String,
      enum: {
        values: ['bathroom', 'door', 'electrical','flooring','interior design',
        'kitchen','lighting','mansory','paint','plumbing','siding']
      }
    },
  },
  {
    timestamps: { currentTime: () => Date.now() },
  }
)

export default model("Product",ProductSchema);