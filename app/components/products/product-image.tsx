'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Package } from 'lucide-react';

export const ProductImage = ({
    src,
    alt,
}: {
    src: string | null;
    alt: string;
}) => {
    const [hasError, setHasError] = useState(false);

    if (!src || hasError) {
        return <Package className="w-20 h-20 text-gray-400" />;
    }

    return (
        <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
            onError={() => setHasError(true)}
        />
    );
};
