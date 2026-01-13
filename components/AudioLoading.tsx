'use client';

import React from 'react';
import { SpeechToTextIcon } from '@/assets/icons';
import SpeechRing from '@/assets/graphics/speech-ring.svg';

export default function AudioLoading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center text-white">
      {/* 背景 */}
      <div className="absolute inset-0 bg-background-light" />

      {/* 中央リング＋アイコン */}
      <div className="relative flex flex-col items-center -mt-16">
        <div className="relative w-40 h-40">
          {/* SVGリング */}
          <SpeechRing className="w-full h-full" />

          {/* 中央アイコン */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="scale-[2.4] text-[#5b8cff]">
              <SpeechToTextIcon />
            </div>
          </div>
        </div>
      </div>

      {/* テキスト */}
      <div className="relative z-10 mt-8 text-center space-y-3">
        <p className="text-[26px] font-semibold tracking-tight">
          音声を準備中です…
        </p>
        <p className="text-base text-white/60 tracking-widest">
          しばらくお待ちください
        </p>
      </div>
    </div>
  );
}