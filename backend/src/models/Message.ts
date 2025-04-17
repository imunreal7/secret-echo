import { Schema, model, Document, Types } from "mongoose";

export interface IMessage extends Document {
    sender?: Types.ObjectId;
    roomId: string;
    content: string;
    createdAt: Date;
}

const MessageSchema = new Schema<IMessage>({
    sender: { type: Schema.Types.ObjectId, ref: "User" },
    roomId: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

export default model<IMessage>("Message", MessageSchema);

