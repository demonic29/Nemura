'use client'

import React from 'react';
import { OnexMobiledataIcon, BedtimeIcon, PlayListAddCheckIcon } from "@icons/index";

export default function ControlBar() {
  return (
    <div className="flex items-center justify-between px-10 h-[60px] w-full bg-transparent">
      
      {/* 再生速度 */}
      <button className="text-white-soft/80 hover:text-white transition-colors">
        <OnexMobiledataIcon className="w-8 h-8" />
      </button>

      {/* スリープタイマー */}
      <button className="text-white-soft/80 hover:text-white transition-colors">
        <BedtimeIcon className="w-7 h-7" />
      </button>

      {/* プレイリスト・完了 */}
      <button className="text-white-soft/80 hover:text-white transition-colors">
        <PlayListAddCheckIcon className="w-8 h-8" />
      </button>
      
    </div>
  );
}