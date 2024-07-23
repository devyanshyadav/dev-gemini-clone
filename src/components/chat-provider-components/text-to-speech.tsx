"use client";
import React, { useState, useEffect, useRef } from "react";
import DevButton from "../dev-components/dev-button";
import { BiSolidVolumeFull } from "react-icons/bi";
import { IoPauseSharp } from "react-icons/io5";
import ReactTooltip from "../dev-components/react-tooltip";

const TextToSpeech = ({
  handleTxtToSpeech,
}: {
  handleTxtToSpeech: () => string;
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const utteranceRef = useRef(
    typeof window !== "undefined" &&
      "speechSynthesis" in window &&
      new SpeechSynthesisUtterance(handleTxtToSpeech())
  );
  const synthRef = useRef(
    typeof window !== "undefined" &&
      "speechSynthesis" in window &&
      window.speechSynthesis
  );

  useEffect(() => {
    utteranceRef.current = new SpeechSynthesisUtterance(handleTxtToSpeech());
    utteranceRef.current.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utteranceRef.current.onpause = () => {
      setIsPlaying(false);
      setIsPaused(true);
    };

    utteranceRef.current.onresume = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, [handleTxtToSpeech]);

  const handlePlay = () => {
    if (isPaused) {
      if (synthRef.current) {
        synthRef.current.resume();
      }
    } else {
      if (isPlaying) {
        if (synthRef.current) {
          synthRef.current.cancel();
        }
      }
      if (synthRef.current) {
        if (utteranceRef.current) {
          synthRef.current.speak(utteranceRef.current);
        }
      }
    }
    setIsPlaying(true);
    setIsPaused(false);
  };

  const handleStop = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    setIsPlaying(false);
    setIsPaused(false);
  };
  return (
    <div className="flex space-x-2 text-xl opacity-80">
      {isPlaying ? (
        <ReactTooltip tipData="cancel">
          <DevButton  variant="v3" size="xl" rounded="full" asIcon onClick={handleStop}>
            <IoPauseSharp />
          </DevButton>
        </ReactTooltip>
      ) : (
        <ReactTooltip tipData="listen">
          <DevButton  variant="v3" size="xl" rounded="full" asIcon onClick={handlePlay}>
            <BiSolidVolumeFull />
          </DevButton>
        </ReactTooltip>
      )}
    </div>
  );
};

export default TextToSpeech;
