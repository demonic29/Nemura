// コントロールバー

'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import SleepTimerModal from "./SleepTimerModal"
import PlaybackSpeedModal from "./PlaybackSpeedModal"
import { OnexMobiledataIcon, BedtimeIcon, PlayListAddCheckIcon } from "@icons/index"

type Props = {
  playbackSpeed: string
  setPlaybackSpeed: React.Dispatch<React.SetStateAction<string>>
  sleepMinutes: number | 'track-end'
  setSleepMinutes: React.Dispatch<React.SetStateAction<number | 'track-end'>>
}

export default function ControlBar({ playbackSpeed, setPlaybackSpeed, sleepMinutes, setSleepMinutes }: Props) {
  const [sleepOpen, setSleepOpen] = useState(false)
  const [speedOpen, setSpeedOpen] = useState(false)
  const router = useRouter()

  return (
    <div className="flex items-center justify-between px-10 h-[60px] w-full bg-transparent relative">

      {/* 再生速度 */}
      <div className="relative">
        <button
          onClick={() => setSpeedOpen(!speedOpen)}
          className="text-white-soft/80 hover:text-white transition-colors"
        >
          <OnexMobiledataIcon className="w-8 h-8" />
        </button>

        <div className="relative">
          <div
            onClick={() => setSpeedOpen(false)}
            className={`
              fixed inset-0 z-40
              transition-opacity duration-200
              ${speedOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
            `}
          />
          <div
            className={`
              absolute bottom-full mb-12 z-50
              transition-all duration-200 ease-out
              ${speedOpen
                ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                : "opacity-0 translate-y-2 scale-95 pointer-events-none"}
              left-[calc(50%-40px)]
            `}
          >
            <PlaybackSpeedModal
              selectedSpeed={playbackSpeed}
              setSelectedSpeed={setPlaybackSpeed}
              onCloseAction={() => setSpeedOpen(false)}
            />
          </div>
        </div>
      </div>

      {/* スリープタイマー */}
      <div className="relative">
        <button
          onClick={() => setSleepOpen(!sleepOpen)}
          className="text-white-soft/80 hover:text-white transition-colors"
        >
          <BedtimeIcon className="w-7 h-7" />
        </button>

        <div className="relative">
          <div
            onClick={() => setSleepOpen(false)}
            className={`
              fixed inset-0 z-40
              transition-opacity duration-200
              ${sleepOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
            `}
          />
          <div
            className={`
              absolute bottom-full mb-12 left-1/2 -translate-x-1/2 z-50
              transition-all duration-200 ease-out
              ${sleepOpen
                ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                : "opacity-0 translate-y-2 scale-95 pointer-events-none"}
            `}
          >
            <SleepTimerModal
              onCloseAction={() => setSleepOpen(false)}
              onSelectTime={(minutes) => setSleepMinutes(minutes)}
            />
          </div>
        </div>
      </div>

      {/* プレイリスト・完了 */}
      <button
        onClick={() => router.push('/playlist')}
        className="text-white-soft/80 hover:text-white transition-colors"
      >
        <PlayListAddCheckIcon className="w-8 h-8" />
      </button>

    </div>
  )
}