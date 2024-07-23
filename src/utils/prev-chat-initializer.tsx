'use client' //Not in use now *for zustand in server side

import geminiZustand from "@/utils/gemini-zustand"

export default function PrevChatInitializer({ prevChat, children }:{prevChat:any, children:any}) {
  geminiZustand.setState({prevChat:prevChat || {userPrompt: "", llmResponse: ""}})
  return children
}