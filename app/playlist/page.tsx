'use client'

import NavigationHeader from "@/components/NavigationHeader"
import NewsCard from "@/components/NewsCard"
import NewsPlayerMini from "@/components/NewsPlayer/NewsPlayerMini"
import { useVoicePlayer } from '@/context/VoicePlayerContext'
import BottomNavigationBar from "@/components/BottomNavigationBar"
import { auth, db } from '@/app/lib/firebase/firebase'
import { doc, onSnapshot, updateDoc, arrayRemove } from 'firebase/firestore'
import { VOICES } from '@/app/lib/voices'

import { useState, useRef, useEffect } from "react"

interface PlaylistItem {
    id: string
    title?: string
    description?: string
    addedAt: any
    voice?: any
}

export default function PlaylistPage() {
    const [items, setItems] = useState<PlaylistItem[]>([])
    const [user, setUser] = useState<any>(null)
    const [userVoiceId, setUserVoiceId] = useState<string | null>(null)
    const { playing, currentItem, setCurrentItem, setPlaying } = useVoicePlayer()
    const miniPlayerRef = useRef<HTMLDivElement>(null)

    // 🔹 Auth
    useEffect(() => {
        const unsubscribeAuth = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser)
        })
        return () => unsubscribeAuth()
    }, [])

    // 🔹 Fetch Playlist & User Voice Preference
    useEffect(() => {
        if (!user) return

        const userDocRef = doc(db, "users", user.uid)

        const unsubscribe = onSnapshot(userDocRef, (snapshot) => {
            const data = snapshot.data()
            const playlistItems = Array.isArray(data?.playlist)
                ? data.playlist
                : []

            setItems(playlistItems)
            // 🔥 Fetch voice preference from user doc
            if (data?.voiceId) {
                setUserVoiceId(data.voiceId)
            }
        })

        return () => unsubscribe()
    }, [user])

    const handleRemove = async (itemId: string) => {
        if (!user) return

        try {
            const userDocRef = doc(db, "users", user.uid)
            const itemToRemove = items.find(item => item.id === itemId)

            if (itemToRemove) {
                await updateDoc(userDocRef, {
                    playlist: arrayRemove(itemToRemove)
                })
            }

            if (currentItem?.title === itemToRemove?.title) {
                setPlaying(false)
                setCurrentItem(null)
            }

        } catch (error) {
            console.error("Error removing item:", error)
        }
    }

    const handlePlay = (item: PlaylistItem) => {
        // 🔥 Find voice from VOICES array using user's voiceId
        const selectedVoice = VOICES.find(v => v.id === userVoiceId) ?? VOICES[0]

        setCurrentItem({
            title: item.title,
            body: item.title,
            voice: selectedVoice
        } as any)
        setPlaying(true)
    }

    // 🔹 Close MiniPlayer on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                miniPlayerRef.current &&
                !miniPlayerRef.current.contains(event.target as Node)
            ) {
                setPlaying(false)
                setCurrentItem(null)
            }
        }

        if (playing) {
            document.addEventListener("mousedown", handleClickOutside)
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [playing, setCurrentItem, setPlaying])

    return (
        <div className="bg-background-light pt-8 min-h-screen w-full relative flex flex-col overflow-hidden">

            <BottomNavigationBar />
            <NavigationHeader title="選択されたプレイリスト" />

            <div className="flex-1 flex flex-col px-6 mt-6 overflow-y-auto pb-32">
                <div className="space-y-4">
                    {items.map((item) => (
                        <NewsCard
                            key={item.id}
                            item={{ ...item, title: item.title || "Untitled" }}
                            onPlayClick={() => handlePlay(item)}
                            onToggleAdd={(added) => {
                                if (!added) handleRemove(item.id)
                            }}
                            isPlaylistMode={true}
                        />
                    ))}
                </div>

                {items.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                        <p>リストにニュースがありません</p>
                    </div>
                )}
            </div>

            {/* 🔥 Animated Mini Player */}
            <div
                ref={miniPlayerRef}
                className={`
                    fixed bottom-0 left-0 right-0 z-[200]
                    transform transition-transform duration-300 ease-in-out
                    ${playing ? "translate-y-0" : "translate-y-full"}
                `}
            >
                <NewsPlayerMini isOpen={playing} />
            </div>
        </div>
    )
}
