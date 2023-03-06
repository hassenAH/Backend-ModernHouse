import mongoose from "mongoose"; 
const {Schema,model} = mongoose;

const ProductPanelSchema = new Schema({
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
});


export default model("ProductPanel",ProductPanelSchema);