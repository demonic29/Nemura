"use client";
import "../globals.css";
import {
  AddCircleIcon,
  PlayCircleIcon,
  ArrowRightIcon,
  SettingIcon,
  GraphicIcon,
} from "@icons/index";
import { useEffect, useState } from "react";
import Link from "next/link";
import SafeImage from "@/components/SafeImage";

type HatenaItem = {
  title: string;
  link: string;
  "hatena:imageurl": string;
  "dc:subject"?: string | string[];
};

const FALLBACK_IMAGE_URL = "/default-image.png";

const NewsCard = ({ news }: { news: HatenaItem }) => {
  const imageUrl = news["hatena:imageurl"] || FALLBACK_IMAGE_URL;
  const subject = Array.isArray(news["dc:subject"])
    ? news["dc:subject"][0]
    : news["dc:subject"] || "未分類";

  return (
    <div className="flex flex-col w-[220px] h-[214px] bg-[#3A86FF]/10 rounded-lg overflow-hidden shadow-lg">
      <div className="relative h-[106px] w-full">
        <SafeImage
          src={imageUrl}
          alt={news.title}
          fill
          sizes="220px"
          className="object-cover"
        />
      </div>
      <div className="p-3 text-white relative">
        <h3 className="text-sm font-semibold leading-5 min-h-[2.5rem] line-clamp-2">
          {news.title}
        </h3>
        <div className="flex justify-between items-center mt-1 text-xs text-gray-400">
          <div className="flex items-center space-x-1">
            <span className="text-blue-400">🌐</span>
            <span>{subject}</span>
          </div>
          <span>10分</span>
        </div>
      </div>
    </div>
  );
};

export default function HomePage() {
  const [popularNews, setpopularNews] = useState<any[]>([]);
  const [newTopics, setnewTopics] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/hatena?type=new")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else setnewTopics(data);
      })
      .catch(() => setError("Failed to load data"));
  }, []);

  useEffect(() => {
    fetch("/api/hatena?type=popular")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else setpopularNews(data);
      })
      .catch(() => setError("Failed to load data"));
  }, []);

  return (
    <div className="min-h-screen bg-background-light text-white p-4 max-w-md mx-auto">
      <header className="relative mb-6">
        <h1 className="text-2xl font-bold text-center">Today&apos;s Summary</h1>
        <SettingIcon
          className="text-gray-400 cursor-pointer absolute right-0 top-1/2 -translate-y-1/2"
          fontSize="medium"
        />
      </header>

      {error && <p className="text-red-400">{error}</p>}

      {/* Voice Summary */}
      <div className="bg-[#3A86FF]/20 p-6 rounded-xl shadow-lg flex items-center justify-between space-x-6 mb-6">
        <div className="flex flex-col justify-between h-full">
          <button className="flex items-center space-x-2 bg-[#0D1B2A] text-white py-2 px-4 rounded-lg shadow-md mb-4 text-base font-semibold">
            <GraphicIcon className="w-6 h-6 mr-2" fontSize="medium" />
            <span>音声で要約を聴く</span>
          </button>
          <p className="text-white text-sm leading-relaxed mt-auto">
            今日の世界を音声で簡単にチェックできます！
          </p>
        </div>

        {/* graphic */}
        <div className="flex-shrink-0 w-32 h-32 md:w-40 md:h-40 rounded-lg relative">
          <SafeImage
            src="/graphic-nemura.png"
            alt="Description"
            fill
            sizes="300px"
            className="rounded-lg object-cover"
          />
        </div>
      </div>

      {/* Tabs */}
      {/* <div className="flex border-2 border-[#3A86FF]/60 rounded-xl h-[38px] p-1 mb-5">
        <button className="flex-1 flex items-center justify-center text-white font-semibold bg-voice-button rounded-md">
          すべて
        </button>
        <button className="flex-1 flex items-center justify-center text-gray-400 font-semibold rounded-md">
          トレンド
        </button>
        <button className="flex-1 flex items-center justify-center text-gray-400 font-semibold rounded-md">
          トピック
        </button>
      </div> */}

      {/* Trending News */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-5">
          <div className="">
            <h2 className="title font-bold">トピック</h2>
            <p className="desc">選択されたトピックに基づくおすすめ</p>
          </div>
          <Link href="/today-news/topic-news" className="flex items-center">
            <p className="text-[#3A86FF]">すべて見る</p>
            <ArrowRightIcon className="w-4 h-4 text-[#3A86FF] cursor-pointer" />
          </Link>
        </div>

        <div className="flex space-x-4 overflow-x-auto pb-2">
          {newTopics.slice(0, 5).map((news, idx) => (
            <div key={idx} className="w-[220px] flex-shrink-0">
              <NewsCard news={news} />
            </div>
          ))}
        </div>
      </div>

      {/* Topic News */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">最新ニュース</h2>
          <Link href="/today-news/latest-news" className="flex items-center">
            <p className="text-[#3A86FF]">すべて見る</p>
            <ArrowRightIcon className="w-4 h-4 text-[#3A86FF] cursor-pointer" />
          </Link>
        </div>

        <div className="space-y-4">
          {popularNews.slice(0, 10).map((i) => (
            <div
              key={i.title}
              className="flex space-x-3 bg-[#3A86FF]/10 rounded-xl p-2 relative"
            >
              <div className="w-20 h-20 relative flex-shrink-0">
                <SafeImage
                  src={i["hatena:imageurl"]}
                  alt={i.title}
                  fill
                  sizes="80px"
                  className="object-cover rounded-lg"
                />
              </div>

              <div className="flex-grow flex flex-col">
                <h3 className="text-base font-semibold line-clamp-2">
                  {i.title}
                </h3>

                <div className="flex justify-between items-center text-xs text-gray-400 mt-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-blue-400">🌐</span>
                    <span>
                      {Array.isArray(i["dc:subject"])
                        ? i["dc:subject"][0]
                        : i["dc:subject"]}
                    </span>
                  </div>
                  {/* <div>
                    <span>10分</span>
                  </div> */}
                </div>
              </div>

              <div className="absolute bottom-2 right-2 flex items-center space-x-2">
                <AddCircleIcon className="w-7 h-7 text-gray-400 cursor-pointer" />
                <PlayCircleIcon className="w-7 h-7 text-gray-400 cursor-pointer" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
