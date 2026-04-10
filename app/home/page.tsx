"use client";

// others
import Link from "next/link";
import SafeImage from "@/components/SafeImage";
import { ChevronRightIcon } from "@icons/index";
import { useEffect, useState } from "react";
import "../globals.css";

// components
import VoiceNewsCard from "@/components/NewsCard";
import VerticalNewsCard from "@/components/VerticalNewsCard";
import BottomNavigationBar from "@/components/BottomNavigationBar";
import NavigationHeader from "@/components/NavigationHeader";

// data fetching
import { HatenaNewsItem, getHatenaNewsSubject } from "@/app/lib/news";
import HomeSectionHeader from "./_components/HomeSectionHeader";

export default function HomePage() {
  const [popularNews, setPopularNews] = useState<HatenaNewsItem[]>([]);
  const [newTopics, setNewTopics] = useState<HatenaNewsItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const newsTypes = ["popular", "new"];

  useEffect(() => {
    fetch("/api/hatena?type=popular")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else setNewTopics(data);
      })
      .catch(() => setError("Failed to load data"));
  }, []);

  useEffect(() => {
    fetch("/api/hatena?type=new")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else setPopularNews(data);
      })
      .catch(() => setError("Failed to load data"));
  }, []);

  return (
    <main>

      {/* bottom nav-bar */}
      <BottomNavigationBar />

      <div className="mx-auto flex w-full max-w-[30rem] flex-1 flex-col pb-28 pt-2">

        {/* -- content -- */}
        <div className="mt-6">

          {/* pickup-section */}
          <section className="mb-8">

            <HomeSectionHeader title="お勧め記事" description="流行っている記事を読もう！" link="/topic" />

            <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 no-scrollbar sm:-mx-6 sm:px-6">
              {newTopics.slice(0, 5).map((news, idx) => (
                <div key={idx} className="flex-shrink-0">
                  <VerticalNewsCard
                    item={{
                      title: news.title,
                      imageUrl: news["hatena:imageurl"],
                      subject: getHatenaNewsSubject(news),
                      body: news.body,
                      link: news.link
                    }}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* latest-news-section */}
          <section className="flex flex-col">

            <HomeSectionHeader title="最新記事" description="Nemura の最新記事をご覧ください！" link="/latest" />
            
            <div className="space-y-3 sm:space-y-4">
              {popularNews.slice(0, 10).map((news) => (
                <VoiceNewsCard
                  key={news.title}
                  item={{
                    title: news.title,
                    imageUrl: news["hatena:imageurl"],
                    subject: getHatenaNewsSubject(news),
                    body: news.body,
                    link: news.link
                  }}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
