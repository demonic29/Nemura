// context/VoicePlayerContext.tsx

'use client'

import { createContext, useContext, useState, ReactNode } from "react"

export type VoiceItem = {
  title: string
  body?: string
  // 他に必要な情報があればここに追加
}

type VoicePlayerContextType = {
  currentItem: VoiceItem | null
  playing: boolean
  character: Character | null  // ←追加
  setCurrentItem: (item: VoiceItem | null) => void
  setPlaying: (playing: boolean) => void
  setCharacter: (character: Character | null) => void  // ←追加
}

const VoicePlayerContext = createContext<VoicePlayerContextType | undefined>(undefined)

export function VoicePlayerProvider({ children }: { children: ReactNode }) {
  const [playing, setPlaying] = useState(false)
  const [currentItem, setCurrentItem] = useState<VoiceItem | null>(null)

  return (
    <VoicePlayerContext.Provider value={{ playing, setPlaying, currentItem, setCurrentItem }}>
      {children}
    </VoicePlayerContext.Provider>
  )
}

export function useVoicePlayer() {
  const context = useContext(VoicePlayerContext)
  if (!context) throw new Error("useVoicePlayer must be used within a VoicePlayerProvider")
  return context
}