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
  },
  {
    timestamps: { currentTime: () => Date.now() },
  }
)

export default model("Product",ProductSchema);