"use client";
import React, { useEffect, useId, useState } from "react";
import { Tooltip } from "react-tooltip";
import {motion} from "framer-motion"
import { createPortal } from "react-dom";

type reactTooltipProps = {
  children: React.ReactNode;
  place?:'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' ;
  tipData: string;
  occupy?: boolean;
};

const ReactTooltip = ({
  children,
  place = "top",
  tipData,
  occupy= true,
}: reactTooltipProps) => {
  const Id = useId();
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
   setMounted(true)
  }, [])
  
  return (
    <>
      {mounted && createPortal(<Tooltip
        id={Id}
        place={place}
        offset={2}
        opacity={1}
        style={{ backgroundColor: "transparent", padding: "0px" }}
      >
        <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-slate-700 z-50 text-white text-xs p-1 px-2 rounded-[5px]  dark:text-white">
          {tipData}
        </motion.div>
      </Tooltip>, document.body)}
      <div className={occupy ? "w-fit" : "w-auto"} data-tooltip-id={Id}>
        {children}
      </div>
    </>
  );
};

export default ReactTooltip;
