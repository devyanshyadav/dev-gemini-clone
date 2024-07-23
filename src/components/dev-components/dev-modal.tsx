"use client";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { motion } from "framer-motion";

type devModalProps = {
  children: React.ReactNode;
  open: boolean;
  isOpen: (open: boolean) => void;
  openBtn: React.ReactNode;
  modalTitle: string;
  loader?: boolean;
};
const DevModal = ({
  children,
  open,
  loader =false,
  isOpen,
  openBtn,
  modalTitle,
}: devModalProps) => {
  const [mounted, isMounted] = useState(false);
  const mainVariants: any = {
    open: { visibility: "visible", opacity: 1 },
    close: {
      opacity: 0,
      transitionEnd: {
        visibility: "hidden",
      },
    },
  };
  const sectionVariants = {
    open: { scale: 1 },
    close: { scale: 0.95 },
  };

  useEffect(() => {
    isMounted(true);
  }, []);
  return (
    <>
      <div className="w-fit" onClick={() => isOpen(true)}>
        {openBtn}
      </div>

      {mounted &&
        createPortal(
          <motion.main
            animate={open ? "open" : "close"}
            variants={mainVariants}
            transition={{ duration: 0.2 }}
            // onClick={() => isOpen(false)}
            initial={{ visibility: "hidden", opacity: 0 }}
            className="bg-black/50  z-[1000] fixed inset-0 h-screen w-screen grid place-content-center"
          >
            <motion.section
              animate={open ? "open" : "close"}
              variants={sectionVariants}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-[95vw] flex flex-col md:w-[40vw] min-h-40 rounded-3xl shadow-md bg-rtlLight dark:bg-rtlDark overflow-hidden p-5"
            >
              <h3 className="text-2xl">{modalTitle}</h3>
             { loader && <span className="modal-loader absolute top-4 right-4"></span>}
              <div className="flex-1">
                {children}
              </div>
            </motion.section>
          </motion.main>,
          document.body
        )}
    </>
  );
};

export default DevModal;
