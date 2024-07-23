"use client";
import React, { useEffect, useState, useRef, useId } from "react";
import { Tooltip as Popover } from "react-tooltip";
import { createPortal } from "react-dom";
import { motion } from "framer-motion"

type DevPopoverProps = {
  children: React.ReactNode;
  popButton: React.ReactNode;
  contentClick?: boolean;
  place?: "left" | "right" | "top" | "bottom" | "bottom-start" | "bottom-end" | "top-start" | "top-end" | "left-start" | "left-end" | "right-start" | "right-end";
};

const DevPopover = ({
  children = "Popover Content",
  popButton,
  contentClick = true,
  place = "bottom",
}: DevPopoverProps) => {
  const [mounted, setMounted] = useState(false);
  const desktopPopoverRef = useRef<HTMLDivElement>(null);
  const mobilePopoverRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const randomId = useId();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        (desktopPopoverRef.current && !desktopPopoverRef.current.contains(event.target as Node)) &&
        (mobilePopoverRef.current && !mobilePopoverRef.current.contains(event.target as Node))&&
        (buttonRef.current && !buttonRef.current.contains(event.target as Node))

      ) {
        setMounted(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <>
      {mounted &&
        createPortal(
          <Popover
            clickable={true}
            isOpen={mounted}
            id={randomId}
            style={{ backgroundColor: "transparent", padding: "0px", zIndex: 1000 }}
            place={place}
            offset={1}
            opacity={1}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              ref={desktopPopoverRef}
              className="min-h-4 text-black md:block hidden dark:text-white border border-accentGray/30 bg-rtlLight shadow-md dark:bg-rtlDark rounded-lg z-50"
              onClick={() => contentClick && setMounted(!mounted)}
            >
              {children && children}
            </motion.div>
            <motion.div
              initial={{ translateY: "100%" }}
              animate={{ translateY: "0%" }}
              exit={{ translateY: "100%" }}
              transition={{ duration: 0.2 }}
              ref={mobilePopoverRef}
              onClick={() => {
                if (contentClick) {
                  setMounted(!mounted);
                }
              }}
              className="shadow-md border-t border-accentGray/30 text-black dark:text-white bg-rtlLight dark:bg-rtlDark min-w-36 p-1 *:!w-full flex-col z-50 block fixed bottom-0 left-0 right-0 md:hidden min-h-4 text-lg"
            >
              {children && children}
            </motion.div>
          </Popover>,
          document.body
        )}
      <div
        ref={buttonRef}
        onClick={() => setMounted(!mounted)}
        data-tooltip-id={randomId}
      >
        {popButton}
      </div>
    </>
  );
};

export default DevPopover;