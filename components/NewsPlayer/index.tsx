"use client"

import { useState, useEffect } from "react"
import SpeechNemura from "./SpeechNemura"
import NewsHeader from "./NewsHeader"
import AudioSeekBar from "./AudioSeekBar"
import NewsBody from "./NewsBody"
import PlaybackControls from "./PlaybackControls"

export default function NewsPlayer() {
  const news = {
    title: "AIが読む今日のニュース",
    body: "ここにニュース本文が入る",
    estimatedDuration: 180 // 総再生時間（秒）
  }

  {/* 状態管理 */}
  const [currentTime, setCurrentTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  // 指定された秒数分、現在の時間を進める/戻す
  const handleSeek = (amount: number) => {
    setCurrentTime((prev) => {
      const nextTime = prev + amount;
      return Math.min(Math.max(nextTime, 0), news.estimatedDuration);
    });
  };

  {/* 再生タイマー */}
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= news.estimatedDuration) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    }

    // クリーンアップ
    return () => clearInterval(timer);
  }, [isPlaying, news.estimatedDuration]);

  return (
    <div className="w-full max-w-xl space-y-4">

      {/* ねむらちん */}
      <div>
        <SpeechNemura isPlaying={isPlaying} />
      </div>

      {/* ヘッダー：タイトルと総再生時間 */}
      <div className="px-8">
        <NewsHeader title={news.title} estimatedDuration={news.estimatedDuration} />
      </div>

      {/* シークバー */}
      <div className="px-8">
        <AudioSeekBar
          duration={news.estimatedDuration}
          current={currentTime}
          onSeek={(time) => setCurrentTime(time)}
        />
      </div>

      {/* 本文エリア */}
      <NewsBody body={news.body} />

      {/* 再生コントロール */}
      <PlaybackControls 
        isPlaying={isPlaying} 
        onToggle={() => setIsPlaying(!isPlaying)}
        onRewind={() => handleSeek(-10)}
        onForward={() => handleSeek(10)}
      />
    </div>
  )
}