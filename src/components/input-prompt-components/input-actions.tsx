"use client";

import React from "react";
import DevButton from "../dev-components/dev-button";

import geminiZustand from "@/utils/gemini-zustand";
import { GoSquareFill } from "react-icons/go";
import SpeechToText from "../chat-provider-components/speech-to-text";
import { RiImageAddFill } from "react-icons/ri";
import { SlCamera } from "react-icons/sl";
import ReactTooltip from "../dev-components/react-tooltip";

const InputActions = ({
  generateMsg,
  handleCancel,
  handleImageUpload
}: {
  generateMsg: () => void;
  handleCancel: () => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
}) => {
  const { currChat, msgLoader } = geminiZustand();
  return (
    <div
      className={`flex justify-end items-center`}
    >
      {currChat.userPrompt && msgLoader ? (
        <ReactTooltip tipData="Stop response">
          <DevButton
            onClick={handleCancel}
            className="!bg-accentBlue/50 p-3"
            rounded="full"
            asIcon
          >
            <GoSquareFill className="text-xl text-black dark:text-white" />
          </DevButton>
        </ReactTooltip>

      )
        : (<>
          <ReactTooltip tipData="Upload image">

            <DevButton
              className="p-3 relative"
              rounded="full"
              variant="v3"
              asIcon
            >
              <input
                type="file"
                id="file-input"
                className="absolute inset-0 z-10 opacity-0 cursor-pointer"
                onChange={handleImageUpload}
                accept="image/*"
              />
              <RiImageAddFill className="text-2xl text-black dark:text-white" />
            </DevButton>
          </ReactTooltip>

          <ReactTooltip tipData="Upload photo">

            <DevButton
              className="p-3 relative md:!hidden !flex"
              rounded="full"
              variant="v3"
              asIcon
            >
              <input
                type="file"
                id="file-input"
                capture="environment"
                className="absolute inset-0 z-10 opacity-0 cursor-pointer"
                onChange={handleImageUpload}
                accept="image/*"
              />
              <SlCamera className="text-2xl text-black dark:text-white" />
            </DevButton>
          </ReactTooltip>

          <SpeechToText />

          <ReactTooltip tipData="Submit">

            <DevButton
              asIcon
              onClick={generateMsg}
              type="submit"
              rounded="full"
              variant="v3"
              className={`overflow-hidden transform origin-right p-2 ${currChat.userPrompt && !msgLoader
                ? "*:w-8 *:scale-100 pointer-events-auto  ml-2"
                : "*:w-0 *:scale-0 pointer-events-none"
                }`}
            >
              <svg
                className="overflow-hidden transition-all transform"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M3 20V4l19 8zm2-3l11.85-5L5 7v3.5l6 1.5-6 1.5zm0 0V7z"
                ></path>
              </svg>
            </DevButton>
          </ReactTooltip>

        </>)}

    </div>
  );
};

export default InputActions;