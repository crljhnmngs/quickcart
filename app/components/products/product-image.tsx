'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Package } from 'lucide-react';

export const ProductImage = ({
    src,
    alt,
    iconClassName = 'w-20 h-20 text-gray-400',
    sizes = '(max-width: 768px) 100vw, 33vw',
}: {
    src: string | null;
    alt: string;
    iconClassName?: string;
    sizes?: string;
}) => {
    const [hasError, setHasError] = useState(false);

    if (!src || hasError) {
        return <Package className={iconClassName} />;
    }

    return (
        <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes={sizes}
            onError={() => setHasError(true)}
        />
    );
};
