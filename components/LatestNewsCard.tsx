'use client'

import { AddCircleIcon, PlayCircleIcon } from '@/assets/icons'
import React from 'react'
import SafeImage from './SafeImage'



import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@nextui-org/react";

export default function LatestNewsCard({i, playAudio, index}: any) {
    
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

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
                    <h3 className="text-base font-semibold line-clamp-2">
                        {i.title}
                    </h3>

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
                    <button onClick={onOpen}>
                        <AddCircleIcon className="w-7 h-7 text-gray-400 cursor-pointer"/>                    
                    </button>

                    <button onClick={() => playAudio(i.title, "47")}>
                        <PlayCircleIcon className="w-7 h-7 text-gray-400 cursor-pointer" />
                    </button>
                </div>
            </div>

            <Modal 
                isOpen={isOpen} 
                onOpenChange={onOpenChange}
                placement="bottom-center"
                size="md"
                hideCloseButton={true}
                className={` bg-[url('../public/playlist-bg.png')] bg-center text-white m-0 rounded-b-none rounded-t-[40px]`}
            >
                <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader className="flex justify-between">
                        <div className='flex items-center gap-2'>
                            <i className="fa-solid fa-list-check"></i>
                            <p>プレリスト</p>
                        </div>

                        <button className='bg-[#1D57A6] text-white px-3 py-1 rounded-lg'>
                            再生
                            <i className="ms-2 fa-regular fa-circle-play"></i>
                        </button>
                    </ModalHeader>
                    <ModalBody>
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
                                <h3 className="text-base font-semibold line-clamp-2">
                                    {i.title}
                                </h3>

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
                                <button onClick={onOpen}>
                                    <AddCircleIcon className="w-7 h-7 text-gray-400 cursor-pointer"/>                    
                                </button>

                                <button onClick={() => playAudio(i.title, "47")}>
                                    <PlayCircleIcon className="w-7 h-7 text-gray-400 cursor-pointer" />
                                </button>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        
                    </ModalFooter>
                    </>
                )}
                </ModalContent>
            </Modal>
        </>
    )
}