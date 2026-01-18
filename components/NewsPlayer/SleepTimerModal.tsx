// スリープタイマー

'use client'

import React from 'react'
import { CheckIcon } from "@/assets/icons/index"

const TIMES: { label: string; minutes: number | 'track-end' }[] = [
  { label: '1時間', minutes: 60 },
  { label: '30分', minutes: 30 },
  { label: '15分', minutes: 15 },
  { label: '5分', minutes: 5 },
  { label: '1分', minutes: 1},
  { label: 'トラック終了時', minutes: 'track-end' }
]

type Props = {
  onCloseAction: () => void
  onSelectTime: (minutes: number | 'track-end') => void
}

export default function SleepTimerModal({ onCloseAction, onSelectTime }: Props) {
  const [selectedTime, setSelectedTime] = React.useState('トラック終了時')

  const handleSelect = (timeLabel: string) => {
    setSelectedTime(timeLabel)

    const timeObj = TIMES.find(t => t.label === timeLabel)
    const minutes =
      timeObj?.minutes === 0 ? 'track-end' : timeObj?.minutes ?? 0

    onSelectTime(minutes)
    onCloseAction() // ✅ close modal
  }


  return (
    <div className="relative inline-block text-sm">
      {/* メインボックス */}
      <div className="relative bg-[#0D1B2A]/90 text-white-soft w-52 rounded-[24px] p-4 shadow-2xl border border-white/5 z-10">
        <h2 className="text-gray-400 text-lg font-bold text-center mb-1">終了時間</h2>
        <hr className="border-white/20 mb-3" />
        <div className="flex flex-col gap-3">
          {TIMES.map((time) => (
            <button
              key={time.label}
              onClick={() => handleSelect(time.label)}
              className="flex items-center justify-center relative text-base font-medium hover:opacity-70 transition-opacity"
            >
              {selectedTime === time.label && (
                <CheckIcon className="absolute left-3 w-5 h-5" />
              )}
              <span className={selectedTime === time.label ? "ml-4" : ""}>{time.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* しっぽ */}
      <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-6 h-6 bg-[#0D1B2A]/90 rotate-45 rounded-sm z-0" />
    </div>
  )
}