import mongoose from "mongoose";
const {Schema,model} = mongoose;
const ReclamationSchema = new Schema(
    {
        commande_id: { type: Schema.Types.ObjectId, ref: 'Cart' },
        sujet:{ type: String },
        description: { type: String },
        user:{ type: Schema.Types.ObjectId, ref: 'User' },
    },

    {
        timestamps: { currentTime: () => Date.now() },
    }
)

export default model("Reclamation",ReclamationSchema);