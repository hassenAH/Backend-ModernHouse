import mongoose from "mongoose";
const {Schema,model} = mongoose;
const PromoSchema = new Schema(
    {
        code: { type: String, required: true, unique: true },
        discount: { type: Number, required: true },
        active: { type: Boolean, default: true },
        expirationDate: { type: Date, required: true },
        user:{ type: Schema.Types.ObjectId, ref: 'User' },
    },

    {
        timestamps: { currentTime: () => Date.now() },
    }
)

export default model("Promo",PromoSchema);