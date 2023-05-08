import mongoose from "mongoose";
const {Schema,model} = mongoose;
const RequestSchema = new Schema(
    {
        productname: { type: String },
        description: { type: String },
        link: { type: String },
        status: { type: String },
        image: { type: String },
        user:[{ type: Schema.Types.ObjectId, ref: 'User' }],
    },

    {
        timestamps: { currentTime: () => Date.now() },
    }
)

export default model("Request",RequestSchema);