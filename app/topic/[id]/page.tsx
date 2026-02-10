'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation';

import sample from '@/public/sample.jpg';
import SafeImage from '@/components/SafeImage';
import { playAudio } from '@/app/lib/audio';
import { auth, db } from '@/app/lib/firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { ArrowRightIcon } from '@/app/assets/icons';

export default function NewsDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const [newsItem, setNewsItem] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [userVoice, setUserVoice] = useState<string>("20");
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        // Fetch user's voice preference
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                try {
                    const userDocRef = doc(db, "users", user.uid);
                    const userSnapshot = await getDoc(userDocRef);
                    const userData = userSnapshot.data();

                    if (userData && userData.voice) {
                        const voiceMap: { [key: string]: string } = {
                            "electronic": "20",
                            "cool": "21",
                            "child": "22",
                            "low": "23",
                            "warm": "24"
                        };
                        setUserVoice(voiceMap[userData.voice] || "20");
                    }
                } catch (err) {
                    console.error("Error fetching user voice:", err);
                }
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        // Fetch news data
        const fetchNews = async () => {
            try {
                const response = await fetch("/api/hatena?type=popular");
                const data = await response.json();

                if (Array.isArray(data)) {
                    const foundNews = data.find((news: any) => news.title === decodeURIComponent(id));
                    setNewsItem(foundNews);
                }
            } catch (err) {
                console.error("Error fetching news:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchNews();
    }, [id]);

    const handlePlayAudio = async () => {
        if (!newsItem) return;

        setIsPlaying(true);
        try {
            await playAudio(newsItem.description, userVoice);
        } catch (err) {
            console.error("Error playing audio:", err);
        } finally {
            setIsPlaying(false);
        }
    };

    if (isLoading) {
        return (
            <div className="bg-background-light min-h-screen flex items-center justify-center">
                <p className="text-white">読み込み中...</p>
            </div>
        );
    }

    if (!newsItem) {
        return (
            <div className="bg-background-light min-h-screen flex items-center justify-center">
                <p className="text-white">ニュースが見つかりません</p>
            </div>
        );
    }

    const imageUrl = newsItem["hatena:imageurl"] || sample;
    const category = Array.isArray(newsItem["dc:subject"])
        ? newsItem["dc:subject"][1]
        : newsItem["dc:subject"] || "未分類";

    return (
        <div className="bg-background-light min-h-screen text-white pb-8">

            {/* Hero image */}
            <div className="w-full h-[250px] relative overflow-hidden">

                <SafeImage
                    alt={newsItem.title}
                    fill
                    src={imageUrl}
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                {/* Back button */}
                <button
                    onClick={() => router.back()}
                    className="text-blue-400 bg-white-soft left-4  rotate-180 rounded-full p-1 absolute top-8 text-sm font-semibold"
                >
                    <ArrowRightIcon/>
                </button>

                {/* Title */}
                <div>
                    <h1 className="text-3xl font-bold leading-snug absolute normal text-white bottom-4 ms-4">
                        {newsItem.title}
                    </h1>
                </div>
            </div>

            {/* Content */}
            <div className="px-4 mt-6 space-y-4">
                {/* Category and Play Button */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 relative flex-shrink-0">
                            <SafeImage
                                src={imageUrl}
                                fill
                                alt={category}
                                className="rounded-full object-cover"
                            />
                        </div>
                        <span className="text-sm font-semibold text-blue-400">{category}</span>
                    </div>

                    <button
                        onClick={handlePlayAudio}
                        disabled={isPlaying}
                        className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 px-4 py-2 rounded-lg font-semibold text-sm transition-all active:scale-95 flex items-center gap-2"
                    >
                        <span>{isPlaying ? "再生中..." : "再生"}</span>
                        <i className={`fa-regular fa-circle-play ${isPlaying ? 'animate-spin' : ''}`}></i>
                    </button>
                </div>



                {/* Description/Summary */}
                <div className="pt-4">
                    <p className="text-[16px] tracking-widest leading-relaxed">
                        {newsItem.description || newsItem.summary || "ニュース詳細"}
                    </p>
                </div>

                {/* Source link */}
                {newsItem.link && (
                    <div className="pt-4">
                        <a
                            href={newsItem.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 underline"
                        >
                            詳細を読む →
                        </a>
                    </div>
                )}
            </div>
        </div>
    )
}
