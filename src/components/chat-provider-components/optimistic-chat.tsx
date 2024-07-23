"use client";

import { MessageProps } from "@/types/types";
import React, { useEffect, useOptimistic } from "react";
import ChatProvider from "./chat-provider";
import ChatActionsBtns from "./chat-actions-btns";
import geminiZustand from "@/utils/gemini-zustand";

const OptimisticChat = ({
  message,
  name,
  image,
}: {
  message: MessageProps[];
  name: string;
  image: string;
}) => {
  const [optimisticChats, addOptimisticChat] = useOptimistic(
    message,
    (state, newChat: MessageProps) => [...state, newChat]
  );
  const { currChat, setPrevChat, setCurrChat, optimisticPrompt, optimisticResponse, inputImgName, setOptimisticResponse } = geminiZustand();

  useEffect(() => {
    if (optimisticResponse) {
      addOptimisticChat({
        _id: Date.now().toString(),
        message: {
          imgName: inputImgName ?? undefined,
          userPrompt: optimisticPrompt ?? "",
          llmResponse: optimisticResponse ?? "",
        },
      });
    }
    // setCurrChat("userPrompt", null);
    if (message && message.length > 0) {
      setPrevChat(message[message.length - 1].message)
    }
  }, [optimisticResponse, message]);

  return (
    <>
      {optimisticChats.map((chat: MessageProps) => (
        <div key={chat._id} className="my-16 mt-10">
          <ChatProvider
            chatUniqueId={chat._id}
            imgInfo={{ imgSrc: image, imgAlt: name }}
            imgName={chat.message.imgName}
            llmResponse={chat.message.llmResponse}
            userPrompt={chat.message.userPrompt}
          />
        </div>
      ))}
    </>
  );
};

export default OptimisticChat;
