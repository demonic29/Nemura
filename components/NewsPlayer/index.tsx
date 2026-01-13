// NewsPlayer/index.tsx
'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import CharacterSelect from "@/app/ai-character/CharacterSelect"
import { Characters } from "@/app/ai-character/config"
import SpeechNemura from "./SpeechNemura"
import NewsHeader from "./NewsHeader"
import AudioSeekBar from "./AudioSeekBar"
import NewsBody from "./NewsBody"
import ControlBar from "./ControlBar"
import PlaybackControls from "./PlaybackControls"

export type VoiceItem = {
  title: string
  body?: string
  imageUrl?: string
  estimatedDuration?: number
}

export type NewsPlayerProps = {
  item: VoiceItem
  showNemura?: boolean
}

export default function NewsPlayer({ item, showNemura = false }: NewsPlayerProps) {
  const router = useRouter()
  const news = {
    title: item.title,
    body: item.body || '',
    imageUrl: item.imageUrl,
    estimatedDuration: item.estimatedDuration || 180
  }

  const [currentTime, setCurrentTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState('1X')
  const [sleepMinutes, setSleepMinutes] = useState<number | 'track-end'>('track-end')
  const [character, setCharacter] = useState(Characters[0]) // 初期キャラクター

  const playAudio = (text: string, speaker: string) => {
    if (typeof window === "undefined") return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    const voice = window.speechSynthesis.getVoices().find(v => v.name === speaker)
    if (voice) utterance.voice = voice
    utterance.lang = "ja-JP"
    utterance.rate = 1
    utterance.pitch = 1
    window.speechSynthesis.speak(utterance)
  }

  // 再生タイマーはそのまま
  const handleSeek = (amount: number) => {
    setCurrentTime(prev => Math.min(Math.max(prev + amount, 0), news.estimatedDuration))
  }

  useEffect(() => {
    let timer: NodeJS.Timeout
    let sleepTimer: NodeJS.Timeout

    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= news.estimatedDuration) {
            setIsPlaying(false)
            return prev
          }
          const numericSpeed = playbackSpeed === '1X' ? 1 : parseFloat(playbackSpeed)
          return prev + 1 * numericSpeed
        })
      }, 1000)

      if (sleepMinutes !== 'track-end') {
        sleepTimer = setTimeout(() => {
          setIsPlaying(false)
          router.push('/good-night')
        }, Number(sleepMinutes) * 60 * 1000)
      } else {
        const remaining = Math.max(news.estimatedDuration - currentTime, 0)
        sleepTimer = setTimeout(() => {
          setIsPlaying(false)
          router.push('/good-night')
        }, remaining * 1000)
      }
    }

    return () => {
      clearInterval(timer)
      clearTimeout(sleepTimer)
    }
  }, [isPlaying, playbackSpeed, sleepMinutes, currentTime, news.estimatedDuration, router])

  return (
    <div className="w-full max-w-xl h-[100svh] flex flex-col">

      {/* キャラクター選択 */}
      <CharacterSelect setCharacter={setCharacter} playAudio={playAudio} />

      {/* 上：固定 */}
      <div className="shrink-0 space-y-4 pb-[36px]">
        {showNemura && <SpeechNemura isPlaying={isPlaying} />}
        <div className="px-8">
          <NewsHeader title={news.title} estimatedDuration={news.estimatedDuration} />
        </div>
        <div className="px-8">
          <AudioSeekBar
            duration={news.estimatedDuration}
            current={currentTime}
            onSeek={setCurrentTime}
          />
        </div>
      </div>

      {/* 本文：レスポンシブ＋スクロール */}
      <div className="flex-1 max-h-[6lh] overflow-y-auto">
        <NewsBody body={news.body} />
      </div>

      {/* 下：固定 */}
      <div className="shrink-0 flex flex-col">
        <PlaybackControls
          isPlaying={isPlaying}
          onToggle={() => setIsPlaying(!isPlaying)}
          onRewind={() => handleSeek(-10)}
          onForward={() => handleSeek(10)}
        />
        <div className="pt-[36px]">
          <ControlBar
            playbackSpeed={playbackSpeed}
            setPlaybackSpeed={setPlaybackSpeed}
            sleepMinutes={sleepMinutes}
            setSleepMinutes={setSleepMinutes}
          />
        </div>
      </div>

    </div>
  )
}