import { ChevronRightIcon } from '@/assets/icons'
import Link from 'next/link'
import React from 'react'

interface HomeSectionHeaderProps {
    title?: string;
    description?: string;
    link?: string;
}

export default function HomeSectionHeader({ title, description, link }: HomeSectionHeaderProps) {
    return (
        <div className="mb-5 flex items-end justify-between gap-3">
            <div>
                <h2 className="title mb-1 text-white-soft">{title || ""}</h2>
                <p className="desc">{description || ""}</p>
            </div>
            <Link href={link || "/"} className="flex items-center gap-1 self-center text-[#3A86FF]">
                <p className='underline caption active:text-white'>すべて見る</p>
            </Link>
        </div>
    )
}
