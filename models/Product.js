import mongoose from "mongoose"; 
const {Schema,model} = mongoose;
const ProductSchema = new Schema(
  {
    productname: { type: String },
    description: { type: String },
    image: { type: String },
    price: {type : Number},
    hor: {type : Number},
    ver: { type: Number },
    surf: { type: Number },
    quantity: { type: Number },
    quantitySales: { type: Number },
    
    category : { type: String,
      enum: {
        values: ['seramic', 'flooring','electrical','kitchen','lighting','masonry','paints','walls'],
        message: '{VALUE} is not supported'
      } },
    user:[{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  
  {
    timestamps: { currentTime: () => Date.now() },
  }
)

export default model("Product",ProductSchema);