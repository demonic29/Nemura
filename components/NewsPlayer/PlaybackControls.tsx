// 再生コントロール

'use client'

import React from 'react'
import {
  Forward10Icon,
  Replay10Icon,
  SkipNextIcon,
} from "@icons/index"
import PauseVoiceRing from '@/assets/graphics/pause-voice-ring.svg'
import PlayVoiceRing from '@/assets/graphics/play-voice-ring.svg'

interface PlaybackControlsProps {
  isPlaying: boolean;
  onToggle: () => void;
  onRewind: () => void;
  onForward: () => void;
}

export default function PlaybackControls({ 
  isPlaying, 
  onToggle, 
  onRewind, 
  onForward 
}: PlaybackControlsProps) {
  return (
    <div className="w-full flex flex-col items-center px-8">
      <div className="flex items-center justify-between w-full max-w-[350px]">
        
        {/* 10秒戻る */}
        <button 
          onClick={onRewind}
          className="text-white-soft opacity-80 hover:opacity-100 transition-all active:scale-90"
        >
          <Replay10Icon className="w-8 h-8" />
        </button>

        {/* 前へ */}
        <button className="text-white-soft opacity-90 hover:opacity-100 transition-all active:scale-90 rotate-180">
          <SkipNextIcon className="w-[50px] h-[50px]" />
        </button>

        {/* 再生・一時停止 */}
        <button 
          className="relative flex items-center justify-center w-20 h-20 transition-all active:scale-95"
          onClick={onToggle}
        >
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {isPlaying ? (
              <PauseVoiceRing className="w-full h-full scale-[1.2]" />
            ) : (
              <PlayVoiceRing className="w-full h-full scale-[1.2]" />
            )}
          </div>
        </button>

        {/* 次へ */}
        <button className="text-white-soft opacity-90 hover:opacity-100 transition-all active:scale-90">
          <SkipNextIcon className="w-[50px] h-[50px]" />
        </button>

        {/* 10秒進む */}
        <button 
          onClick={onForward}
          className="text-white-soft opacity-80 hover:opacity-100 transition-all active:scale-90"
        >
          <Forward10Icon className="w-8 h-8" />
        </button>
      </div>
    </div>
  )
}