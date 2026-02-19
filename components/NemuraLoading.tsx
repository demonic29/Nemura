import React from 'react'
import Fade from './Fade'
import smileNemura from '@/assets/animations/smile-nemura.json'


// クライアント専用で LottiePlayer を読み込む
import dynamic from "next/dynamic";
const LottiePlayer = dynamic(() => import("@/components/LottiePlayer"), { ssr: false });

export default function NemuraLoading() {
    return (
        <Fade>
            <LottiePlayer data={smileNemura} width={200} height={200}/>
        </Fade>
    )
}
