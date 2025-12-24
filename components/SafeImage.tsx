"use client";
import Image from "next/image";
import { useState } from "react";

const FALLBACK = "/default-image.png";

export default function SafeImage({ src, alt,sizes, ...props }: any) {
    const [imgSrc, setImgSrc] = useState(src || FALLBACK);

    return (
        <Image
            {...props}
            src={imgSrc}
            sizes={sizes}
            alt={alt}
            onError={() => setImgSrc(FALLBACK)}
        />
    );
}
