"use client";
import GradientLoader from "@/components/chat-provider-components/gradient-loader";
import geminiZustand from "@/utils/gemini-zustand";
import Image from "next/image";
import { BsImage } from "react-icons/bs";
import { MdImageSearch, MdOutlineImage } from "react-icons/md";
import { SiGooglegemini } from "react-icons/si";

export default function Loading() {
  const { currChat, userData, msgLoader, inputImgName } = geminiZustand();
  return (
    <section className="w-full h-full">
      {
        msgLoader ? (
          <div className=" mx-auto max-w-3xl w-full p-4">
            <div key="loader" className="my-16 mt-10 fade-in-element">
              <div className="w-full h-fit flex items-start gap-3">
                <Image
                  src={userData?.image || ""}
                  alt={userData?.name || ""}
                  width={35}
                  height={35}
                  className="rounded-full cursor-pointer"
                />
                <textarea
                  className="prompt-area pt-1 text-base resize-none bg-transparent outline-none rounded-md px-1 w-full"
                  rows={5}
                  readOnly
                  value={currChat.userPrompt}
                />
              </div>
              {inputImgName &&
                <div className="w-full mt-3">
                  <div className="p-4 max-w-full w-fit bg-rtlLight overflow-hidden dark:bg-rtlDark rounded-md flex items-start gap-2">
                    <MdOutlineImage className="text-4xl" />
                    <p className="text-lg truncate"> {inputImgName}</p></div>
                </div>
              }
              <div className="w-full flex justify-end h-16 items-center">
              </div>
              <div id="new-chat" className="flex md:flex-row flex-col w-full items-start gap-4">
                <SiGooglegemini className="text-4xl text-[#4E82EE] animate-spin transition-all duration-500" />
                <GradientLoader />
              </div>
            </div>
          </div>
        ) : (
          <div className="loader" />
        )
      }
    </section>
  )
}
