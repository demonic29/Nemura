// components/VerticalNewsCard.tsx
'use client'
import SafeImage from './SafeImage'
import { useState } from 'react'
import { AddCircleIcon, RemoveCircleIcon, PlayCircleIcon } from "@/assets/icons/index"
import Link from 'next/link'

export type VoiceItem = {
  title: string
  imageUrl?: string
  body?: string
  subject?: string | string[]
  [key: string]: any
}

export type VerticalNewsCardProps = {
  item: VoiceItem
  isAdded?: boolean
  onPlayClick?: () => void
  onToggleAdd?: (added: boolean) => void
}

export default function VerticalNewsCard({
  item,
  isAdded = false,
  onPlayClick,
  onToggleAdd
}: VerticalNewsCardProps) {
  const [added, setAdded] = useState(isAdded)

  const handleToggleAdd = (e: React.MouseEvent) => {
    e.stopPropagation()
    setAdded(!added)
    onToggleAdd?.(!added)
  }

  const subject = Array.isArray(item.subject) ? item.subject[0] : item.subject || "未分類"
  const imageUrl = item.imageUrl || item["hatena:imageurl"]

  return (
    <Link href={`/topic/${encodeURIComponent(item.title)}`}>
      <div className="flex flex-col w-[220px] h-[214px] bg-[#3A86FF]/10 rounded-xl overflow-hidden shadow-lg relative cursor-pointer hover:bg-[#3A86FF]/20 transition-colors">
        
        <div className="relative h-[300px] w-full">
          {imageUrl && <SafeImage src={imageUrl} alt={item.title} fill sizes="(max-width: 740px) 100vw" className="object-cover" />}
        </div>

        <div className="p-3 text-white relative flex flex-col h-full">
          <h3 className="text-sm font-semibold leading-5 min-h-[2.5rem] line-clamp-2">{item.title}</h3>
          <span className="text-xs text-gray-400 mt-auto">{subject}</span>

          <div className="absolute bottom-2 right-3 flex items-center space-x-3 text-gray-400">
            <button onClick={handleToggleAdd} className="hover:opacity-70 transition-opacity">
              {added ? <RemoveCircleIcon className="w-7 h-7" /> : <AddCircleIcon className="w-7 h-7" />}
            </button>
            <button onClick={(e) => { e.stopPropagation(); onPlayClick?.() }} className="hover:opacity-70 transition-opacity">
              <PlayCircleIcon className="w-7 h-7" />
            </button>
          </div>
          
        </div>

      </div>
    </Link>
  )
}