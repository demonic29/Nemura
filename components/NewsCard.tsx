// NewsCard.tsx

'use client'

import SafeImage from './SafeImage'
import { useState } from 'react'
import { AddCircleIcon, RemoveCircleIcon, PlayCircleIcon } from "@/assets/icons"

export type VoiceItem = {
  title: string
  imageUrl?: string
  body?: string
  subject?: string | string[]
  [key: string]: any
}

export type NewsCardProps = {
  item: VoiceItem
  isAdded?: boolean
  onPlayClick?: () => void
  onToggleAdd?: (added: boolean) => void
}

export default function NewsCard({
  item,
  isAdded = false,
  onPlayClick,
  onToggleAdd,
}: NewsCardProps) {
  const [added, setAdded] = useState(isAdded)

  const handleToggleAdd = (e: React.MouseEvent) => {
    e.stopPropagation()
    setAdded(!added)
    onToggleAdd?.(!added)
  }

  // subject を item["dc:subject"] から取得
  const subject =
    Array.isArray(item["dc:subject"])
      ? item["dc:subject"][1] || "未分類"
      : item["dc:subject"] || item.subject || "未分類"

  // 画像は item.imageUrl 優先、それがなければ item["hatena:imageurl"]
  const imageUrl = item.imageUrl || item["hatena:imageurl"]

  return (
    <div
      className="flex w-full h-[100px] bg-[#3A86FF]/10 rounded-xl overflow-hidden relative cursor-pointer hover:bg-[#3A86FF]/20 transition-colors"
    >

      {/* 画像 */}
      <div className="w-[100px] h-full relative flex-shrink-0">
        imageUrl ? (
          <SafeImage
          src={imageUrl}
          alt={item.title}
          fill
          className="object-cover"
        />
        )
      </div>

      {/* テキスト */}
      <div className="flex-grow flex flex-col relative px-2 pt-3">
        <h3 className="text-sm font-semibold line-clamp-2 text-white">
          {item.title}
        </h3>
        <div className="absolute bottom-2 left-0 px-2 text-xs text-gray-400">
          {subject}
        </div>
      </div>

      {/* アクションボタン（常にアイコン） */}
      <div className="absolute bottom-1 right-2 flex items-center space-x-2">
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
          onClick={(e) => { e.stopPropagation(); onPlayClick?.() }}
          className="p-1 hover:opacity-70 transition-opacity"
        >
          <PlayCircleIcon className="w-7 h-7 text-gray-400" />
        </button>
      </div>
    </div>
  )
}