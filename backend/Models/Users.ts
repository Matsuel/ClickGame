import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    uuid: { type: String, required: true, unique: true },
    socketId: { type: String, required: true, unique: true },
    gameJoinedAt: { type: Date, required: true },
    leftClickCount: { type: Number, required: true, default: 0 },
    rightClickCount: { type: Number, required: true, default: 0 },
});

const UserModel = mongoose.model("User", userSchema);