import mongoose from "mongoose"; 
const {Schema,model} = mongoose;
const ProductSchema = new Schema(
  {
    productname: { type: String },
    description: { type: String },
    image: { type: String },
    price: {type : Number},
    height: {type : Number},
    width: { type: Number },
    item: { type: Number },
    depth: { type: Number },
    quantity: { type: Number },
    quantitySales: { type: Number },
    image3D: { type: String },
    category : { type: String},
    user:[{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  
  {
    timestamps: { currentTime: () => Date.now() },
  }
)

export default model("Product",ProductSchema);