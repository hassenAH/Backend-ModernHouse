import mongoose from "mongoose";
const {Schema,model} = mongoose;
const RateSchema = new Schema(
    {
        product_id: { type: Schema.Types.ObjectId, ref: 'Product' },
        rate: { type: Number },
        feedback: { type: String },
        user:{ type: Schema.Types.ObjectId, ref: 'User' },
    },

    {
        timestamps: { currentTime: () => Date.now() },
    }
)

export default model("Rate",RateSchema);