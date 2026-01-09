'use client'

import React from "react"
import NavigationHeader from "@/components/NavigationHeader"
import NewsPlayer from "@/components/NewsPlayer"
import ControlBar from "@/components/ControlBar"
import Wave from '@/assets/graphics/wave.svg'

export default function Page() {
  return (
    <main
      className="min-h-screen w-full relative"
      style={{ backgroundImage: 'linear-gradient(to bottom, #00040a, #003569, #004E9A)' }}
    >
      <div className="pt-[54px] relative z-10">
        <NavigationHeader />
      </div>

      <div className="relative z-10">
        <NewsPlayer />
      </div>

      <div className="fixed bottom-[60px] left-0 w-full z-10">
        <ControlBar />
      </div>

      <div className="absolute bottom-0 left-0 w-full z-0">
        <Wave className="w-full h-auto" />
      </div>

    </main>
  )
}