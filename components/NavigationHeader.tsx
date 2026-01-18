// NavigationHeader.tsx

'use client'

import { useRouter } from 'next/navigation'
import { ArrowRightIcon, SettingIcon } from "@/assets/icons/index"

type Props = {
  showSetting?: boolean
  showBack?: boolean  // 戻るボタンを表示するか
  title?: string
}

export default function NavigationHeader({ showSetting = true, showBack = true, title }: Props) {
  const router = useRouter()

  return (
    <header className="flex items-center justify-between px-6 h-[54px] w-full bg-transparent">
      {/* 戻るボタン */}
      {showBack ? (
        <button
          onClick={() => router.back()}
          className="p-2 text-white/70 transition-opacity hover:opacity-70 z-10 translate-y-[2px]"
          aria-label="戻る"
        >
          <div className="inline-block" style={{ transform: 'scaleX(-1)' }}>
            <ArrowRightIcon className="w-7 h-7" />
          </div>
        </button>
      ) : (
        <div className="w-10" /> // 戻るボタン非表示時のスペース確保
      )}

      {/* 中央タイトル */}
      {title && (
        <div className="flex-1 text-center">
          <h1 className="text-xl font-bold text-white truncate">{title}</h1>
        </div>
      )}

      {/* 設定ボタン */}
      {showSetting ? (
        <button
          onClick={() => router.push('/settings')}
          className="p-2 text-white/70 transition-opacity hover:opacity-70"
          aria-label="設定"
        >
          <SettingIcon className="w-7 h-7" />
        </button>
      ) : (
        <div className="w-10" /> // 設定ボタン非表示時のスペース確保
      )}
    </header>
  )
}