"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import SleekToggle from "../dev-components/sleek-toggle";

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return;
  }

  return <SleekToggle toggle={theme as string} setTheme={setTheme} />;
}
