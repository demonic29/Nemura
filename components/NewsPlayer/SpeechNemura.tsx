// ねむらゾーン

'use client'

import { useState, useEffect } from "react"
import LottiePlayer from "@/components/LottiePlayer"
import SpeechVoiceRing from '@/assets/graphics/speech-ring.svg'
import sleepJson from "@/assets/animations/sleep-nemura.json"
import smileJson from "@/assets/animations/smile-nemura.json"

type Props = { isPlaying: boolean }

export default function SpeechNemura({ isPlaying }: Props) {
  const [currentAnimation, setCurrentAnimation] = useState(isPlaying ? smileJson : sleepJson)
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    setOpacity(0)
    const timeout = setTimeout(() => {
      setCurrentAnimation(isPlaying ? smileJson : sleepJson)
      setOpacity(1)
    }, 200)
    return () => clearTimeout(timeout)
  }, [isPlaying])

  return (
    <div className="w-full flex justify-center">
      {/* リング＋ねむらアニメ */}
      <div className="relative w-[304px] h-[304px] flex items-center justify-center">

        {/* 背景リング */}
        <SpeechVoiceRing className="absolute inset-0 w-full h-full" />

        {/* Lottie */}
        <div
          className="relative w-[150px] h-[150px] transition-opacity duration-200"
          style={{ opacity }}
        >
          <LottiePlayer
            data={currentAnimation}
            loop={true}
            width={150}
            height={150}
          />
        </div>
      </div>
    </div>
  )
}