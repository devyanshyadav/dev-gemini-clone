'use client'
import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, Variants } from 'framer-motion'

interface DevDrawerProps {
  openBtn: React.ReactNode
  open: boolean
  setOpen: (open: boolean) => void
  children: React.ReactNode
  position?: 'left' | 'right' | 'top' | 'bottom'
}

const getVariants = (position: 'left' | 'right' | 'top' | 'bottom'): {
  section: Variants
  div: Variants
} => {
  const translateProperty = position === 'left' || position === 'right' ? 'translateX' : 'translateY'
  const translateValue = position === 'left' || position === 'top' ? '-100%' : '100%'

  return {
    section: {
      open: { visibility: "visible", opacity: 1 },
      closed: {
        opacity: 0,
        transitionEnd: {
          visibility: "hidden",
        },
      },
    },
    div: {
      open: { [translateProperty]: '0%' },
      closed: { [translateProperty]: translateValue },
    },
  }
}

const DevDrawer: React.FC<DevDrawerProps> = ({
  openBtn,
  open,
  setOpen,
  children,
  position = 'right',
}) => {
  const [mounted, setMounted] = useState(false)
  const { section: sectionVariants, div: divVariants } = getVariants(position)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  if (!mounted) return openBtn
  const getPositionClasses = () => {
    switch (position) {
      case 'left': return `left-0 top-0 bottom-0 w-80 border-r`
      case 'right': return `right-0 top-0 bottom-0 w-80 border-l`
      case 'top': return `top-0 left-0 right-0 h-80 border-b`
      case 'bottom': return `bottom-0 left-0 right-0 h-80 border-t`
    }
  }

  return (
    <>
      {openBtn}
      {createPortal(
        <motion.section
          animate={open ? "open" : "closed"}
          variants={sectionVariants}
          transition={{ duration: 0.2 }}
          initial="closed"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-50 bg-black/30"
        >
          <motion.div
            animate={open ? "open" : "closed"}
            transition={{ duration: 0.2 }}
            variants={divVariants}
            onClick={(e) => e.stopPropagation()}
            className={`absolute ${getPositionClasses()} bg-slate-50 p-3 dark:bg-slate-800 border-cyan-500/50 overflow-auto`}
          >
            <h2 className="sticky top-0 border-b border-cyan-500/50 py-2 text-xl font-semibold">
              Drawer
            </h2>
            <button
              className="absolute top-2 right-2 text-xl text-cyan-500/50 hover:text-cyan-500"
              onClick={() => setOpen(false)}
              aria-label="Close drawer"
            >
              🗙
            </button>
            {children}
          </motion.div>
        </motion.section>,
        document.body
      )}
    </>
  )
}

export default DevDrawer