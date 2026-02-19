'use client'

import { createContext, useContext, useState, ReactNode } from "react"
import { Characters } from "@/app/ai-character/config"

export type VoiceItem = {
    title: string
    body?: string
    imageUrl?: string
    estimatedDuration?: number
}

type VoicePlayerContextType = {
    currentItem: VoiceItem | null
    playing: boolean
    character: any | null
    queue: VoiceItem[]
    currentIndex: number
    setCurrentItem: (item: VoiceItem | null) => void
    setPlaying: (playing: boolean) => void
    setCharacter: (character: typeof Characters | null) => void
    playQueue: (items: VoiceItem[]) => void
    playNext: () => void
    playPrev: () => void
}

const VoicePlayerContext = createContext<VoicePlayerContextType | undefined>(undefined)

export function VoicePlayerProvider({ children }: { children: ReactNode }) {

    const [queue, setQueue] = useState<VoiceItem[]>([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [playing, setPlaying] = useState(false)
    const [currentItem, setCurrentItem] = useState<VoiceItem | null>(null)
    const [character, setCharacter] = useState<typeof Characters | null>(null)

    // ▶ Play entire queue
    const playQueue = (items: VoiceItem[]) => {
        if (items.length === 0) return

        setQueue(items)
        setCurrentIndex(0)
        setCurrentItem(items[0])
        setPlaying(true)
    }

    // ▶ Next item
    const playNext = () => {
        if (currentIndex < queue.length - 1) {
            const nextIndex = currentIndex + 1
            setCurrentIndex(nextIndex)
            setCurrentItem(queue[nextIndex])
            setPlaying(true)
        } else {
            // End of playlist
            setPlaying(false)
            setQueue([])
            setCurrentIndex(0)
        }
    }

    // ◀ Previous item
    const playPrev = () => {
        if (currentIndex > 0) {
            const prevIndex = currentIndex - 1
            setCurrentIndex(prevIndex)
            setCurrentItem(queue[prevIndex])
            setPlaying(true)
        }
    }

    return (
        <VoicePlayerContext.Provider value={{
            currentItem,
            setCurrentItem,
            playing,
            setPlaying,
            character,
            setCharacter,
            queue,
            currentIndex,
            playQueue,
            playNext,
            playPrev,
        }}>
            {children}
        </VoicePlayerContext.Provider>
    )
}

export function useVoicePlayer() {
    const context = useContext(VoicePlayerContext)
    if (!context) {
        throw new Error("useVoicePlayer must be used within a VoicePlayerProvider")
    }
    return context
}
