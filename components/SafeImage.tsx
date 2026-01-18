"use client";
import Image from "next/image";
import { useState } from "react";
import loadingImg from '@/app/loading-img.png';

export default function SafeImage({ src, alt,sizes, ...props }: any) {
    const [imgSrc, setImgSrc] = useState(src || loadingImg);

    return (
        <Image
            {...props}
            src={imgSrc}
            sizes={sizes}
            alt={alt}
            onError={() => setImgSrc(loadingImg)}
            priority
        />
    );
}
