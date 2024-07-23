"use client";
import geminiZustand from "@/utils/gemini-zustand";
import { FormatOutput } from "@/utils/shadow";
import Image from "next/image";
import React, { useEffect } from "react";
import { SiGooglegemini } from "react-icons/si";
import Markdown from "react-markdown";
import root from "react-shadow/styled-components";
import GradientLoader from "./gradient-loader";
import { MdImageSearch, MdOutlineImage } from "react-icons/md";
import { BsImage } from "react-icons/bs";

const MsgLoader = ({
  name,
  image,
}: {
  name: string;
  image: string;
}) => {
  const { currChat, msgLoader, inputImgName } = geminiZustand();
  return (
    msgLoader && (
      <div key="loader" className="my-16 mt-10 fade-in-element">
        <div className="w-full h-fit flex items-start gap-3">
          <Image
            src={image}
            alt={name}
            width={35}
            height={35}
            className="rounded-full cursor-pointer"
          />
          <textarea
            className="prompt-area pt-1 max-h-40  text-base resize-none bg-transparent outline-none rounded-md px-1 w-full"
            readOnly
            value={currChat.userPrompt}
          />
        </div>
        {inputImgName &&
          <div className="w-full mt-3 overflow-hidden">
            <div className="p-4 max-w-full w-fit bg-rtlLight dark:bg-rtlDark rounded-md flex items-start gap-2">
              <MdOutlineImage className="text-4xl" />
              <p className="text-lg  truncate"> {inputImgName}</p></div>
          </div>
        }
        <div className="w-full flex justify-end h-16 items-center">
        </div>
        <div id="new-chat" className="flex md:flex-row flex-col w-full items-start gap-4">
          <SiGooglegemini className="text-4xl text-[#4E82EE] animate-spin transition-all duration-500" />
          {!currChat.llmResponse ? (
            <GradientLoader />
          ) : (
            <root.div className="w-full shadowDiv -translate-y-4">
              <FormatOutput>
                <Markdown>{currChat.llmResponse}</Markdown>
              </FormatOutput>
            </root.div>
          )}
        </div>
      </div>
    )
  );
};

export default MsgLoader;
