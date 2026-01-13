"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import NavigationHeader from "@/components/NavigationHeader";
import NewsCard from "@/components/NewsCard";
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
  <div className="bg-background-light h-screen flex flex-col">
  {/* ヘッダー固定 */}
  <div className="pt-[54px] shrink-0">
    <NavigationHeader title="最新ニュース" />
  </div>
  <div className="px-5">
    {/* トピック絞り込み */}
    <div className="pt-4">
      <p className="desc">トピック絞り込み</p>
      <div className="flex gap-2 overflow-x-auto pb-2 my-4 scrollbar-hide">
        {topics.map((subject, index) => (
          <button
            key={index}
            onClick={() =>
              setSelectedTopic(selectedTopic === subject ? null : subject)
            }
            className={`flex-shrink-0 bg-gradient-to-r from-[#1D57A6] to-[#2868B8] text-white text-sm font-medium rounded-full px-5 py-2.5 hover:shadow-lg hover:scale-105 transition-all duration-200 whitespace-nowrap ${
              selectedTopic === subject ? "ring-2 ring-blue-200" : ""
            }`}
          >
            {subject}
          </button>
        ))}
      </div>
    </div>

    {/* ニュース */}
    <div className="flex-1 overflow-y-auto space-y-4 pb-4">
      {filteredNews.slice(0, 10).map((item, index) => (
        <NewsCard
          key={index}
          item={item}
          onToggleAdd={(added) => console.log("added:", added)}
        />
      ))}
    </div>
  </div>
</div>
  );
}