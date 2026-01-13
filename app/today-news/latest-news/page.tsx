"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import NavigationHeader from "@/components/NavigationHeader";
import LatestNewsCard from "@/components/LatestNewsCard";
import { Characters } from '../../ai-character/config';

export default function LatestNews() {
  const [popularNews, setPopularNews] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/hatena?type=new")
      .then(res => res.json())
      .then(data => {
        if (data.error) setError(data.error);
        else setPopularNews(data);
      })
      .catch(() => setError("Failed to load data"));
  }, []);

  const playAudio = async (text: string, speaker: string) => {
    try {
      const responseAudio = await axios.post("/api/audio", { text, speaker });
      const characterVoice = Characters[18].label;

      const base64Audio = responseAudio?.data?.response;
      const byteArray = Buffer.from(base64Audio, "base64");
      const audioBlob = new Blob([byteArray], { type: "audio/x-wav" });
      const audioUrl = URL.createObjectURL(audioBlob);

      const audio = new Audio(audioUrl);
      audio.volume = 1;
      audio.play();

      console.log("再生中キャラクター:", characterVoice);
    } catch (e) {
      console.error(e);
    }
  };

  // subjectを必ず string | null に統一
  const normalizeSubject = (item: any): string | null => {
    if (!item["dc:subject"]) return null;
    return Array.isArray(item["dc:subject"]) ? item["dc:subject"][1] || null : item["dc:subject"] || null;
  };

  const filteredNews = selectedTopic
    ? popularNews.filter(item => normalizeSubject(item) === selectedTopic)
    : popularNews;

  // トピック一覧
  const topics = Array.from(
    new Set(popularNews.map(i => normalizeSubject(i)).filter(Boolean))
  ) as string[];

  return (
    <div className="bg-background-light min-h-screen text-white px-2 py-6">
      <NavigationHeader title="最新ニュース" />

      <div>
        <p className="desc">トピック絞り込み</p>
        <div className="flex gap-2 overflow-x-auto pb-2 my-4 scrollbar-hide">
          {topics.map((subject, index) => (
            <button
              key={index}
              onClick={() =>
                setSelectedTopic(selectedTopic === subject ? null : subject)
              }
              className={`flex-shrink-0 bg-gradient-to-r from-[#1D57A6] to-[#2868B8] text-white text-sm font-medium rounded-lg px-5 py-2.5 hover:shadow-lg hover:scale-105 transition-all duration-200 whitespace-nowrap ${
                selectedTopic === subject ? "ring-2 ring-blue-200" : ""
              }`}
            >
              {subject}
            </button>
          ))}
        </div>

        {/* ニュース一覧 */}
        <div className="space-y-4">
          {filteredNews.slice(0, 10).map((item, index) => (
            <LatestNewsCard
            key={index}
            item={item}
            selectedCharacter={selectedCharacter}  // ← 親コンポーネントで保持してる選択キャラ
            onToggleAddAction={(added) => console.log("added:", added)}
          />
          ))}
        </div>
      </div>
    </div>
  );
}