import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
    gameStartedAt: { type: Date, required: true },
    gameEndedAt: { type: Date, required: true },
    leftClickCount: { type: Number, required: true },
    rightClickCount: { type: Number, required: true }
});

const GameModel = mongoose.model("Game", gameSchema);
