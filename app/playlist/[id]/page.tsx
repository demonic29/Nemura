'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { auth, db } from '@/app/lib/firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import SafeImage from '@/components/SafeImage';
import { playAudio } from '@/app/lib/audio';
import sample from '@/public/sample.jpg';
import { ArrowRightIcon } from '@/app/assets/icons';

export default function NewsDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const [newsItem, setNewsItem] = useState<any>(null);
    const [userVoice, setUserVoice] = useState<string>('20');
    const [isLoading, setIsLoading] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (!user) {
                setIsLoading(false);
                return;
            }

            try {
                const userRef = doc(db, 'users', user.uid);
                const snapshot = await getDoc(userRef);
                const userData = snapshot.data();
                // console.log('User Data:', userData?.playlist);

                if (!userData) {
                    setIsLoading(false);
                    return;
                }

                // 🔹 1. Get Voice
                const voiceMap: Record<string, string> = {
                    electronic: '20',
                    cool: '21',
                    child: '22',
                    low: '23',
                    warm: '24',
                };

                if (userData.voice) {
                    setUserVoice(voiceMap[userData.voice] || '20');
                }

                // 🔹 2. Get Playlist (force array)
                const playlist = Array.isArray(userData?.playlist) ? userData.playlist : [];
                console.log('Playlist:', playlist);

                // 🔹 3. Find News By ID
                const found = playlist.find((item: any) => item?.id === id);

                setNewsItem(found || null);

            } catch (error) {
                console.error('Error loading user data:', error);
            } finally {
                setIsLoading(false);
            }
        });

        return () => unsubscribe();
    }, [id]);

    // 🔹 Play Audio
    const handlePlayAudio = async () => {
        if (!newsItem?.description) return;

        setIsPlaying(true);

        try {
            await playAudio(newsItem.description, userVoice);
        } catch (error) {
            console.error('Audio error:', error);
        } finally {
            setIsPlaying(false);
        }
    };

    // 🔹 Loading UI
    if (isLoading) {
        return (
            <div className="bg-background-light min-h-screen flex items-center justify-center">
                <p className="text-white">読み込み中...</p>
            </div>
        );
    }

    // 🔹 Not Found UI
    if (!newsItem) {
        return (
            <div className="bg-background-light min-h-screen flex items-center justify-center">
                <p className="text-white">ニュースが見つかりません</p>
            </div>
        );
    }

    // 🔹 Safe category
    const rawSubject = newsItem?.['dc:subject'];
    const category = Array.isArray(rawSubject)
        ? rawSubject[1] ?? rawSubject[0] ?? '未分類'
        : rawSubject ?? '未分類';

    const imageUrl = newsItem?.imageUrl || sample;

    return (
        <div className="bg-background-light min-h-screen text-white pb-8">

            {/* Hero */}
            <div className="w-full h-[250px] relative overflow-hidden">
                <SafeImage
                    alt={newsItem.title || 'news'}
                    fill
                    src={imageUrl}
                    className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                <button
                    onClick={() => router.back()}
                    className="text-blue-400 bg-white-soft left-4 rotate-180 rounded-full p-1 absolute top-8"
                >
                    <ArrowRightIcon />
                </button>

                <h1 className="text-lg font-bold absolute bottom-4 ms-4">
                    {newsItem.title}
                </h1>
            </div>

            {/* Content */}
            <div className="px-4 mt-6 space-y-8">

                {/* Category + Play */}
                <div className="flex justify-between items-center">
                    <span className="text-blue-400 font-semibold text-sm">
                        {category}
                    </span>

                    <button
                        onClick={handlePlayAudio}
                        disabled={isPlaying}
                        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-sm"
                    >
                        {isPlaying ? '再生中...' : '再生'}
                    </button>
                </div>

                {/* Description */}
                <p className="text-[16px] leading-loose tracking-wider mb-8">
                    {newsItem.desc || newsItem.summary || 'ニュース詳細'}
                </p>

                {/* Source */}
                {newsItem.link && (
                    <a
                        href={newsItem.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 underline text-sm block"
                    >
                        詳細へ
                    </a>
                )}
            </div>
        </div>
    );
}
