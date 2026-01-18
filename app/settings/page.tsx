'use client'

import { useRouter } from "next/navigation"
import Background from "@/components/Background"
import NavigationHeader from "@/components/NavigationHeader"
import LottiePlayer from "@/components/LottiePlayer"
import { AddCircleIcon, GraphicIcon } from "@/assets/icons/index"
import smileJson from "@/assets/animations/smile-nemura.json"

export default function SettingsPage() {
  const router = useRouter()

  const SETTINGS_MENU = [
    {
      id: "topics",
      label: "おすすめトピック",
      icon: <AddCircleIcon className="w-7 h-7 text-gray-soft" />,
      path: "/settings/choose-topic",
    },
    {
      id: "voice",
      label: "読み上げ音声",
      icon: <GraphicIcon className="w-7 h-7 text-gray-soft" />,
      path: "/settings/choose-voice",
    },
  ]

  return (
    <Background>
      <div className="relative w-full h-[100dvh] z-0">

        <div className="relative z-50">
          <div className="h-[54px]" /> {/* 上余白 */}
          <div className="h-[54px]">
            <NavigationHeader showSetting={false} />
          </div>
        </div>

        <div className="relative z-40 flex flex-col items-center px-10 gap-5 mt-20">
          {SETTINGS_MENU.map((item) => (
            <button
            key={item.id}
            onClick={() => {
              console.log("リンクをクリックしました:", item.path)
              router.push(item.path)
            }}
            className="relative z-50 cursor-pointer flex items-center w-full max-w-[340px] bg-white-soft py-4 px-5 rounded-full shadow-lg transition-all active:scale-[0.97] pointer-events-auto"
          >
            <div className="flex items-center justify-center w-8 translate-y-0.5 pointer-events-none">
              {item.icon}
            </div>
            <span className="ml-4 text-base leading-none text-gray-soft pointer-events-none">
              {item.label}
            </span>
          </button>
          ))}
        </div>

        {/* 3. 背景のアニメーション：z-10 で一番奥へ */}
        <div className="absolute bottom-[-60px] w-full flex justify-center pointer-events-none z-10">
          <LottiePlayer data={smileJson} width={340} height={340} />
        </div>

      </div>
    </Background>
  )
}