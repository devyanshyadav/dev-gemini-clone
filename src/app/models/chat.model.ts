import { Schema, model, models } from "mongoose";

const chatSchema = new Schema(
  {
    participant: { type: Schema.Types.ObjectId, ref: "User" },
    
    chatInfo: { icon: { type: String, default: null }, title: { type: String, default:null } },
    isPinned: { type: Boolean, default: false },
    chatID: { type: String, required: [true, "Chat ID is required"] },
    message: {
      userPrompt: String,
      llmResponse: String,
      imgName: { type: String, default: null },
    },
  },
  { timestamps: true }
);

const Chat = models.Chat || model("Chat", chatSchema);

export default Chat;
