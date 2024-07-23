"use client";
import clsx from "clsx";
import React from "react";

type devToggleProps = {
  toggle: string;
  size?: "sm" | "md" | "lg";
  setTheme: (theme: string) => void;
};

const SleekToggle = ({ toggle, size = "md", setTheme }: devToggleProps) => {
  const sizes = {
    sm: {
      width: 2,
      height: 1,
    },
    md: {
      width: 2.5,
      height: 1.3,
    },
    lg: {
      width: 3.5,
      height: 1.5,
    },
  };

  const toggleSize = sizes[size] || sizes["md"];

  return (
    <>
      <label
        style={{
          width: toggleSize.width + "rem",
          height: toggleSize.height + "rem",
        }}
        htmlFor="toggleBox"
        className={clsx("p-1 relative grid items-center")}
      >
        <hr
          className={clsx(
            toggle==="dark" ? "bg-blue-500" : "bg-accentGray",
            "w-full rounded-full border-none"
          )}
          style={{
            height: toggleSize.height + 110 + "%",
          }}
        />
        <input
          type="checkbox"
          className="opacity-0 peer absolute cursor-pointer inset-0"
          checked={toggle==="dark"}
          id="toggleBox"
          onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
        />
        <div
          className={clsx(
            "h-full absolute bg-slate-900 dark:bg-blue-300 aspect-square pointer-events-none transition-all duration-400 rounded-full"
          )}
          style={{
            transform: toggle==="dark" ?
               "translateX(" + (toggleSize.width - toggleSize.height) + "rem)"
              : " translateX(0rem)",
          }}
        ></div>
      </label>
    </>
  );
};

export default SleekToggle;
