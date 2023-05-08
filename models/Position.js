import mongoose from "mongoose"; 
const {Schema,model} = mongoose;

const PositionSchema = new Schema({
  attitude: { type: String },
  engetude:{type:String},
},

{
    timestamps:true
});


export default model("Position",PositionSchema);