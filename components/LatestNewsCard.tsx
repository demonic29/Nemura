'use client'

import { AddCircleIcon, PlayCircleIcon } from '@/app/assets/icons'
import React, { useState, useEffect } from 'react'
import SafeImage from './SafeImage'
import { auth, db } from '@/app/lib/firebase/firebase'
import { doc, onSnapshot, updateDoc, arrayRemove } from 'firebase/firestore'

import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@nextui-org/react";
import Link from 'next/link'

interface PlaylistItem {
    id: string
    title: string
    imageUrl: string
    category: string
    link: string
    addedAt: any
}

export default function LatestNewsCard({i, playAudio, index, id}: any) {
    
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [isAdding, setIsAdding] = useState(false);
    const [playlist, setPlaylist] = useState<PlaylistItem[]>([]);
    const [user, setUser] = useState<any>(null);

    // Get current user
    useEffect(() => {
        const unsubscribeAuth = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribeAuth();
    }, []);

    // Real-time listener for user's playlist
    useEffect(() => {
        if (!user) return;

        const userDocRef = doc(db, "users", user.uid);
        
        const unsubscribe = onSnapshot(userDocRef, (snapshot) => {
            const data = snapshot.data();
            const items = (data?.playlist || []) as PlaylistItem[];
            setPlaylist(items);
        });

        return () => unsubscribe();
    }, [user]);

    // Function to add news to user's playlist
    const handleAddClick = async () => {
        if (!user) {
            alert('ログインしてください');
            return;
        }

        setIsAdding(true);
        try {
            const newsItem = {
                id: Date.now().toString(),
                title: i.title,
                imageUrl: i["hatena:imageurl"],
                category: Array.isArray(i["dc:subject"]) ? i["dc:subject"][1] : i["dc:subject"],
                link: i.link,
                addedAt: new Date().toISOString(),
            };

            const userDocRef = doc(db, "users", user.uid);
            await updateDoc(userDocRef, {
                playlist: [...playlist, newsItem],
            });

            console.log('Document added to user playlist');
            
            // Open modal after successful save
            onOpen();
        } catch (error) {
            console.error('Error adding document: ', error);
            alert('エラーが発生しました');
        } finally {
            setIsAdding(false);
        }
    };

    // Function to remove item from user's playlist
    const removeFromPlaylist = async (itemId: string) => {
        if (!user) return;

        try {
            const itemToRemove = playlist.find((item) => item.id === itemId);
            if (itemToRemove) {
                const userDocRef = doc(db, "users", user.uid);
                await updateDoc(userDocRef, {
                    playlist: playlist.filter((item) => item.id !== itemId),
                });
                console.log('Item removed from user playlist');
            }
        } catch (error) {
            console.error('Error removing item:', error);
            alert('削除に失敗しました');
        }
    };

    return (
        <>
            <div
                key={index}
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
                    <Link href={`/latest/${i.title}`}>
                        <h3 className="normal underline font-semibold text-gray-200 line-clamp-3">
                            {i.title}
                        </h3>
                    </Link>

                    <div className="flex justify-between items-center text-xs text-gray-400 mt-2">
                        <div className="flex items-center space-x-2">
                            <span className="text-blue-400">🌐</span>
                            <span>
                                {Array.isArray(i["dc:subject"])
                                ? i["dc:subject"][1]
                                : i["dc:subject"]}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-2 right-2 flex items-center space-x-2">
                    <button 
                        onClick={handleAddClick}
                        disabled={isAdding}
                    >
                        <AddCircleIcon 
                            className={`w-7 h-7 cursor-pointer ${
                                isAdding ? 'text-gray-300' : 'text-gray-400'
                            }`}
                        />                    
                    </button>

                    <button onClick={() => playAudio(i.title, "20")}>
                        <PlayCircleIcon className="w-7 h-7 text-gray-400 cursor-pointer" />
                    </button>
                </div>
            </div>

            {/* Modal showing all saved posts */}
            <Modal 
                isOpen={isOpen} 
                onOpenChange={onOpenChange}
                size="2xl"
                className={`bg-[url('/playlist-bg.png')] bg-center m-0 rounded-b-none rounded-t-3xl text-white`}
                scrollBehavior="inside"
            >
                <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader className="flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <i className="fa-solid fa-list-check"></i>
                                <span>プレイリスト</span>
                            </div>
                            <span className="text-sm text-gray-500 font-normal">
                                {playlist.length} 件
                            </span>
                        </div>
                    </ModalHeader>
                    <ModalBody className='px-3'>
                        {playlist.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                <i className="fa-regular fa-folder-open text-4xl mb-2"></i>
                                <p>プレイリストは空です</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {playlist.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex gap-3 bg-[url('/playlist-bg.png')] bg-bottom p-3 rounded-lg"
                                    >
                                        <div className="w-16 h-16 relative flex-shrink-0">
                                            <SafeImage
                                                src={item.imageUrl}
                                                alt={item.title}
                                                fill
                                                // sizes="64px"
                                                className="object-cover rounded-lg"
                                            />
                                        </div>
                                        <div className="flex-grow min-w-0">
                                            <h4 className="font-semibold text-sm line-clamp-2">
                                                {item.title}
                                            </h4>
                                            <p className="text-xs text-gray-300 mt-1">
                                                {item.category}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => removeFromPlaylist(item.id)}
                                            className="flex-shrink-0 text-red-500 hover:text-red-700 transition-colors"
                                        >
                                            <i className="fa-solid fa-trash text-sm"></i>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        {/* <Button 
                            color="primary" 
                            onPress={onClose}
                            className="w-full"
                        >
                            閉じる
                        </Button> */}
                    </ModalFooter>
                    </>
                )}
                </ModalContent>
            </Modal>
        </>
    )
}