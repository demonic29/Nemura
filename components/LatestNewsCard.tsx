// LatestNewsCard.tsx

'use client'

import { AddCircleIcon, PlayCircleIcon, RemoveCircleIcon } from '@/app/assets/icons'
import React, { useState } from 'react'
import SafeImage from './SafeImage'
import { useRouter } from "next/navigation"
import { useVoicePlayer, VoiceItem } from '@/context/VoicePlayerContext'

export type LatestNewsCardProps = {
  item: VoiceItem
  isAdded?: boolean
  onToggleAddAction?: (added: boolean) => void
}

export default function LatestNewsCard({
  item,
  isAdded = false,
  onToggleAddAction,
}: LatestNewsCardProps) {
  const [added, setAdded] = useState(isAdded)
  const router = useRouter()
  const { setCurrentItem, setPlaying } = useVoicePlayer()

  // 追加・削除切り替え
  const handleToggleAdd = (e: React.MouseEvent) => {
    e.stopPropagation()
    setAdded(!added)
    onToggleAddAction?.(!added)
  }

  // 再生ボタン押下
  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentItem(item)
    setPlaying(true)
    router.push('/voice-player')
  }

  return (
    <div
      className="flex space-x-3 bg-[#3A86FF]/10 rounded-xl p-2 relative cursor-pointer hover:bg-[#3A86FF]/20 transition-colors"
    >
      {/* サムネイル */}
      <div className="w-20 h-20 relative flex-shrink-0">
        <SafeImage
          src={item.imageUrl || item["hatena:imageurl"]}
          alt={item.title}
          fill
          sizes="80px"
          className="object-cover rounded-lg"
        />
      </div>

      {/* テキスト */}
      <div className="flex-grow flex flex-col relative">
        <h3 className="text-base font-semibold line-clamp-2 pr-14 text-white">
          {item.title}
        </h3>
        <div className="absolute bottom-2 left-0 text-xs text-gray-400">
          {Array.isArray(item["dc:subject"]) ? item["dc:subject"][1] : item["dc:subject"] || "未分類"}
        </div>
      </div>

      {/* アクションボタン */}
      <div className="absolute bottom-2 right-2 flex items-center space-x-2">
        <button
          onClick={handleToggleAdd}
          className="p-1 hover:opacity-70 transition-opacity"
        >
          {added ? (
            <RemoveCircleIcon className="w-7 h-7 text-gray-400" />
          ) : (
            <AddCircleIcon className="w-7 h-7 text-gray-400" />
          )}
        </button>

        <button
          onClick={handlePlay}
          className="p-1 hover:opacity-70 transition-opacity"
        >
          <PlayCircleIcon className="w-7 h-7 text-gray-400" />
        </button>
      </div>
    </div>
  )
}