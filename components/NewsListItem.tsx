// NewsListItem.tsx
'use client'

import SafeImage from './SafeImage'
import { useState } from 'react'

export type NewsListItemProps = {
  title: string
  imageUrl?: string
  subject?: string
  onPlayClick?: () => void
  onToggleAdd?: (added: boolean) => void
}

export default function NewsListItem({
  title,
  imageUrl,
  subject,
  onPlayClick,
  onToggleAdd,
}: NewsListItemProps) {
  const [added, setAdded] = useState(false)

  const handleToggleAdd = (e: React.MouseEvent) => {
    e.stopPropagation()
    setAdded(!added)
    onToggleAdd?.(!added)
  }

  return (
    <div
      className="flex space-x-3 bg-[#3A86FF]/10 rounded-xl p-2 relative cursor-pointer hover:bg-[#3A86FF]/20 transition-colors"
    >
      {/* サムネイル */}
      <div className="w-20 h-20 relative flex-shrink-0">
        {imageUrl && <SafeImage src={imageUrl} alt={title} fill className="object-cover rounded-lg" />}
      </div>

      {/* テキスト */}
      <div className="flex-grow flex flex-col relative">
        <h3 className="text-base font-semibold line-clamp-2 pr-14 text-white">{title}</h3>
        <div className="absolute bottom-2 left-0 text-xs text-gray-400">{subject}</div>
      </div>

      {/* アクションボタン */}
      <div className="absolute bottom-2 right-2 flex items-center space-x-2">
        <button
          onClick={handleToggleAdd}
          className="p-1 hover:opacity-70 transition-opacity"
        >
          {added ? '削除' : '追加'}
        </button>

        <button
          onClick={(e) => { e.stopPropagation(); onPlayClick?.() }}
          className="p-1 hover:opacity-70 transition-opacity"
        >
          再生
        </button>
      </div>
    </div>
  )
}