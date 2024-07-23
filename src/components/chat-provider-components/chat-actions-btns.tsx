"use client";
import React, { useState } from "react";
import { BiDislike, BiLike } from "react-icons/bi";
import DevButton from "../dev-components/dev-button";
import ReactTooltip from "../dev-components/react-tooltip";
import ModifyResponse from "./modify-response";
import ShareChat from "./share-chat";
import { FiMoreVertical } from "react-icons/fi";
import DevPopover from "../dev-components/dev-popover";
import { Toaster, toast } from 'sonner'
import { MdContentCopy, MdOutlineFlag } from "react-icons/md";
import geminiZustand from "@/utils/gemini-zustand";
import { FcGoogle } from "react-icons/fc";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Link from "next/link";
import { IoMdSearch } from "react-icons/io";


const ChatActionsBtns = ({
  chatID,
  llmResponse,
  userPrompt,
  shareMsg,
}: {
  chatID: string;
  llmResponse: string;
  userPrompt: string;
  shareMsg: string;
}) => {
  const { devToast, setToast } = geminiZustand();
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEY as string);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const [googleRes, setGoogleRes] = useState<string[] | null>(null)
  const [loader, setLoader] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareMsg);
      setToast('Copied to clipboard')
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleDoubleCheck = async () => {
    const prompt = `
      Generate a list of at least 5 different Google search queries based strictly on the user prompt. Provide the queries in an array format without any unnecessary responses. Ensure the queries are relevant and varied but aligned with the user's prompt.
      Previous chats:
      Current User Query:
      ${userPrompt}`
    try {
      setLoader(true)
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      const googleResArray = JSON.parse(text);
      setGoogleRes(googleResArray)

    } catch (error) {
      console.log(error)
    }
    finally {
      setLoader(false)
    }
  }
  return (
    <>
      <div className="w-full flex items-center gap-2 !text-2xl mt-2">
        {[
          { icon: BiLike, tipdata: "Good job" },
          { icon: BiDislike, tipdata: "Bad job" },
        ].map((item, index) => (
          <ReactTooltip key={index} tipData={item.tipdata}>
            <DevButton
              asIcon
              rounded="full"
              size="lg"
              variant="v2"
              className="opacity-80"
            >
              <item.icon />
            </DevButton>
          </ReactTooltip>
        ))}
        <ModifyResponse chatUniqueId={chatID} llmResponse={llmResponse} />
        <ShareChat shareMsg={shareMsg} />
        <ReactTooltip tipData="Double-check response">
          <DevButton
            asIcon
            rounded="full"
            onClick={handleDoubleCheck}
            size="lg"
            variant="v2"
            className="opacity-80"
          >
            {loader ? <span className="modal-loader"></span> : <FcGoogle />}
          </DevButton>
        </ReactTooltip>
        <DevPopover
          place="top-start"
          popButton={
            <ReactTooltip tipData="more">
              <DevButton
                asIcon
                rounded="full"
                size="lg"
                variant="v2"
                className="opacity-80"
              >
                <FiMoreVertical />
              </DevButton>
            </ReactTooltip>
          }
        >
          <div className="w-52 py-2">
            <DevButton
              onClick={copyToClipboard}
              variant="v3"
              className="w-full !justify-start gap-3 group"
              rounded="none"
            >
              <MdContentCopy className="text-xl" />
              Copy
            </DevButton>
            <DevButton
              variant="v3"
              className="w-full !justify-start gap-3 group"
              rounded="none"
            >
              <MdOutlineFlag className="text-xl" />
              Report legal issue
            </DevButton>
          </div>
        </DevPopover>
      </div>

      {googleRes && googleRes.length > 0 && <div className="w-full md:w-[90%] mt-5 mx-auto overflow-hidden p-5 rounded-2xl space-y-3 bg-accentGray/10">
        <h3>Search related topics</h3>
        <div className="space-y-1">
          {
            googleRes.map((item, index) => <DevButton target="_blank" variant="v2" href={`https://www.google.com/search?q=${item}`} className=" text-accentBlue/80 w-full !justify-start text-left flex items-center gap-2 hover:!bg-accentBlue/15" key={index}>
              <IoMdSearch className="text-xl" />
              <p className="truncate">{item}</p>
            </DevButton>)
          }
        </div>
      </div>}
    </>
  );
};

export default ChatActionsBtns;
