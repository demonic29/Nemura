"use client";

import { ArrowRightIcon, AddCircleIcon, PlayCircleIcon } from "@/assets/icons";
import { useEffect, useState } from "react";
import Image from "next/image";
import HeaderNav from "@/components/HeaderNav";
import SafeImage from "@/components/SafeImage";
import axios from "axios";
import { Characters } from '../../ai-character/config';
import LatestNewsCard from "@/components/LatestNewsCard";


export default function LatestNews() {
  const [popularNews, setpopularNews] = useState<any[]>([]);
  const [newTopics, setnewTopics] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/hatena?type=new")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else setpopularNews(data);
      })
      .catch(() => setError("Failed to load data"));
  }, []);

  const speakText = (text: string) => {
    if (typeof window === "undefined") return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ja-JP"; // Set your preferred language
    utterance.rate = 1;
    utterance.pitch = 1;

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeech = () => {
    if (typeof window === "undefined") return;
    window.speechSynthesis.cancel();
  };

  // useEffect(() => {
  //     const voices = window.speechSynthesis.getVoices();
  //     utterance.voice = voices.find(v => v.lang === "ja-JP") || voices[0];

  // }, [])

  // 音声再生
  const [character, setCharacter] = useState<string>('');
  console.log(character)

  const playAudio = async (text: string, speaker: string) => {
    try {
      // 音声取得
      const responseAudio = await axios.post("/api/audio", {
        text,
        speaker,
      });

      const characterVoice = Characters[18].label;
      console.log(characterVoice);

      // Base64形式で取得
      const base64Audio = responseAudio?.data?.response;
      // Bufferに変換
      const byteArray = Buffer.from(base64Audio, "base64");
      // Blobに変換
      const audioBlob = new Blob([byteArray], { type: "audio/x-wav" });
      // URLに変換
      const audioUrl = URL.createObjectURL(audioBlob);
      // 音声作成
      const audio = new Audio(audioUrl);
      // 音量[0-1]設定
      audio.volume = 1;
      // 再生
      audio.play();

      setCharacter(characterVoice)
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="bg-background-light text-white px-2 py-6">
      {/* <ArrowLeftIcon className="w-4 h-4 text-[#3A86FF] cursor-pointer" /> */}

      <HeaderNav title="最新ニュース" />

      <div>
        <div>
          <p className="desc">トピック絞り込み</p>

          {/* topics */}
          <div className="flex gap-2 overflow-x-auto pb-2 my-4 scrollbar-hide">
            {popularNews.map((i, index) => {
              const subject = Array.isArray(i["dc:subject"])
                ? i["dc:subject"][1]
                : i["dc:subject"];

              return (
                <button
                  key={index}
                  className="flex-shrink-0 bg-gradient-to-r from-[#1D57A6] to-[#2868B8] text-white text-sm font-medium rounded-lg px-5 py-2.5 hover:shadow-lg hover:scale-105 transition-all duration-200 whitespace-nowrap"
                >
                  {subject}
                </button>
              );
            })}
          </div>
        </div>

        {/* news */}
        <div className="space-y-4">
          {popularNews.slice(0, 10).map((i,index) => (
            <LatestNewsCard key={index} i={i} playAudio={playAudio}/>
          ))}
        </div>
      </div>
    </div>
  );
}
