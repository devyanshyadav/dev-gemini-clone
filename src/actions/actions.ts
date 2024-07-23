"use server";
import Chat from "@/app/models/chat.model";
import { Message } from "../types/types";
import connectDB from "../utils/db";
import { Types } from "mongoose";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";


export const createChat = async (
  chat: Message & { userID: string; chatID: string; imgName?: string }
) => {
  try {
    const session = await auth();
    if (!session) {
      throw new Error("User not authenticated");
    }
    const {user}=session
    await connectDB();
    const { userPrompt, llmResponse, chatID, imgName } = chat;
    const data = await Chat.create({
      participant: user?.id,
      chatID,
      message: { userPrompt, llmResponse, imgName},
    });
    revalidatePath(`/app/[${chatID}]`);
    // Serialize the data
    const serializedData = JSON.parse(JSON.stringify(data));
    return { message: serializedData, success: true };
  } catch (error: any) {
    console.error(error);
    return { success: false, message: error.message };
  }
};

export const getSidebarChat = async (userID: string) => {
  try {
    await connectDB();
    const data = await Chat.aggregate([
      { $match: { participant: new Types.ObjectId(userID) } },
      {
        $group: {
          _id: "$chatID",
          doc: { $first: "$$ROOT" },
        },
      },
      { $replaceRoot: { newRoot: "$doc" } },
      { $sort: { isPinned: -1, createdAt: -1 } }, // Sort by isPinned (descending) then createdAt (descending)
    ]);
    return { success: true, message: JSON.parse(JSON.stringify(data)) };
  } catch (error) {
    console.error("Error in getSidebarChat:", error);
    return { success: false };
  }
};

export const getChatHistory = async ({
  userID,
  chatID,
}: {
  userID: string;
  chatID: string;
}) => {
  try {
    await connectDB();
    const data = await Chat.find({
      participant: new Types.ObjectId(userID),
      chatID: chatID,
    });
    return { success: true, message: JSON.parse(JSON.stringify(data)) };
  } catch (error) {
    console.error("Error in getChatHistory:", error);
    return { success: false };
  }
};

export const deleteChat = async (chatID: string) => {
  try {
    await connectDB();
    const session = await auth();
    if(!session){
      throw new Error("User not authenticated")
    }
    const {user}=session
    const data = await Chat.deleteMany({
      participant: new Types.ObjectId(user?.id),
      chatID: chatID,
    });
    revalidatePath("/app");
    return { success: true, message: JSON.parse(JSON.stringify(data)) };
  } catch (error) {
    console.error("Error in deleteChat:", error);
    return { success: false };
  }
};

export const renameChat = async (
  chatID: string,
  message: Partial<{ title: string | null; icon: string | null }>
) => {
  try {
    const session = await auth();
    if(!session){
      throw new Error("User not authenticated")
    }
    const {user}=session

    const chatInfo = {
      ...(message.title ? { title: message.title } : {}),
      ...(message.icon ? { icon: message.icon } : {}),
    };

    const result = await Chat.updateMany(
      {
        participant: new Types.ObjectId(user?.id),
        chatID,
      },
      { $set: { chatInfo } },
      { new: true }
    );

    if (!result) {
      return {
        success: false,
        message: "Chat not found or user not authorized",
      };
    }
    revalidatePath("/app");
    return { success: true, message: JSON.parse(JSON.stringify(result)) };
  } catch (error) {
    console.error("Error in renameChat:", error);
    return {
      success: false,
      message: "An error occurred while renaming the chat",
    };
  }
};

export const pinChat = async (chatID: string, pinStatus: boolean) => {
  try {
    const session = await auth();
    if(!session){
      throw new Error("User not authenticated")
    }
    const {user}=session
    await connectDB();
    

    const result = await Chat.updateMany(
      {
        participant: new Types.ObjectId(user?.id),
        chatID,
      },
      { $set: { isPinned: pinStatus } },
      { new: true }
    );
    if (!result) {
      return {
        success: false,
        message: "Chat not found or user not authorized",
      };
    }
    revalidatePath("/app");
    return { success: true, message: JSON.parse(JSON.stringify(result)) };
  } catch (error) {
    console.error("Error in pinChat:", error);
    return {
      success: false,
      message: "An error occurred while pinning the chat",
    };
  }
};

export const updateResponse = async ({
  chatUniqueId,
  updatedResponse,
}: {
  chatUniqueId: string;
  updatedResponse: string;
}) => {
  try {
    const updatedChat = await Chat.findByIdAndUpdate(
      chatUniqueId,
      {
        $set: {
          "message.llmResponse": updatedResponse,
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedChat) {
      return {
        success: false,
        message: "Chat not found",
      };
    }
    return {
      success: true,
      message: JSON.parse(JSON.stringify(updatedChat)),
    };
  } catch (error) {
    console.error("Error updating response:", error);
    return {
      success: false,
      message: "An error occurred while updating response",
    };
  }
};

// export const generateResponse = async (prompt: string) => {
//   try {
//     await connectDB();
//     if (!prompt) {
//       throw new Error("Prompt is empty");
//     }
//     const res = await axios.post(
//       `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.NEXT_PUBLIC_API_KEY}`,
//       {
//         contents: [{ parts: [{ text: prompt }] }],
//       }
//     );
//     const generatedResponse = res.data.candidates[0].content.parts[0].text;
//     if (!res || !generatedResponse) {
//       throw new Error("Failed to generate response");
//     }

//     return {
//       success: true,
//       message: generatedResponse,
//     };
//   } catch (error) {
//     return {
//       success: false,
//       message: error,
//     };
//   }
// };