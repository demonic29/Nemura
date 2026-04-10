import React from 'react'

// components
import NavigationHeader from '@/components/NavigationHeader'
import SafeImage from '@/components/SafeImage'

// images
import graphicNemura from '@/assets/graphic-nemura.png'
import fallbackImage from '@/assets/fallback-image.png'

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='bg-background-light no-scrollbar px-3 max-w-md mx-auto'>

            {/* home nav-bar */}
            <div>
                <div className="">
                    <NavigationHeader title="今日の Nemura" showBack={false} className="px-0" />
                </div>

                <div className="mt-4 flex justify-center">
                    <div className="relative aspect-[3/1] w-full">
                        <SafeImage
                            src="/graphic-nemura.png"
                            alt="nemura バナー"
                            fill
                            sizes="(max-width: 640px) 92vw, 25rem"
                            className="object-contain"
                        />
                    </div>
                </div>
            </div>
            
            {children}
        </div>
    )
}
