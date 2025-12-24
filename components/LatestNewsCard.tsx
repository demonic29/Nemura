import { AddCircleIcon, PlayCircleIcon } from '@/assets/icons'
import React from 'react'
import SafeImage from './SafeImage'

// export type CharacterSelectProps = {
//     i: any
//     playAudio: (text: string, speaker: string) => Promise<void>
// }

export default function LatestNewsCard({i, playAudio, index}: any) {
    return (
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
                    {/* <div>
                    <span>10分</span>
                    </div> */}
                </div>
            </div>

            <div className="absolute bottom-2 right-2 flex items-center space-x-2">
                <AddCircleIcon className="w-7 h-7 text-gray-400 cursor-pointer" />
                <button onClick={() => playAudio(i.title, "47")}>
                    <PlayCircleIcon className="w-7 h-7 text-gray-400 cursor-pointer" />
                </button>
            </div>
        </div>
    )
}
