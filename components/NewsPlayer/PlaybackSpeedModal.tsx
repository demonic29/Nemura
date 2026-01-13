// 再生速度調整

'use client'

import React from 'react'

const SPEEDS = ['0.5', '1X', '1.5', '2.0', '2.5', '3.0']

type Props = {
  onCloseAction?: () => void
  selectedSpeed: string
  setSelectedSpeed: React.Dispatch<React.SetStateAction<string>>
}

export default function PlaybackSpeedModal({ onCloseAction, selectedSpeed, setSelectedSpeed }: Props) {
  return (
    <div className="relative inline-block text-sm">
      <div className=" relative bg-[#0D1B2A]/90 text-white-soft w-64 rounded-[24px] p-4 shadow-2xl border border-white/5 z-10">
        <h2 className="text-gray-400 text-lg font-bold text-center mb-1">再生速度を調整</h2>
        <hr className="border-white/20 mb-4" />
        <div className="flex items-center justify-between gap-2">
          {SPEEDS.map((speed) => {
            const isSelected = selectedSpeed === speed
            return (
              <button
                key={speed}
                onClick={() => setSelectedSpeed(speed)}
                className={`
                  flex items-center justify-center
                  w-8 h-8 rounded-full text-xs font-bold transition-all
                  ${isSelected 
                    ? 'bg-white-soft text-[#0D1B2A] scale-110' 
                    : 'bg-white/20 text-white-soft hover:bg-white/30'
                  }
                `}
              >
                {speed}
              </button>
            )
          })}
        </div>
      </div>

      <div className="absolute left-[15%] -bottom-2 -translate-x-1/2 w-6 h-6 bg-[#0D1B2A]/90 rotate-45 rounded-sm z-0" />
    </div>
  )
}