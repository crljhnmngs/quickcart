'use client';

import { useState } from 'react';
import { ProductImage } from './product-image';

type ProductDetailsImagesProps = {
    images: string[];
    name: string;
};

export const ProductDetailsImages = (props: ProductDetailsImagesProps) => {
    const { images, name } = props;
    const [selectedImage, setSelectedImage] = useState(0);

    return (
        <div className="w-1/2">
            <div className="bg-linear-to-br from-gray-100 to-gray-200 rounded-2xl h-125 flex items-center justify-center mb-6 shadow-inner relative overflow-hidden">
                <ProductImage
                    src={images[selectedImage] || null}
                    alt={name}
                    iconClassName="w-40 h-40 text-gray-400"
                    sizes="50vw"
                />
            </div>
            <div className="grid grid-cols-4 gap-4">
                {images &&
                    images.length > 0 &&
                    images.slice(0, 4).map((image, i) => (
                        <div
                            key={i}
                            onClick={() => setSelectedImage(i)}
                            className={`bg-linear-to-br from-gray-100 to-gray-200 rounded-xl h-28 flex items-center justify-center cursor-pointer border-2 transition-all relative overflow-hidden ${
                                i === selectedImage
                                    ? 'border-blue-600 shadow-md'
                                    : 'border-transparent hover:border-blue-400'
                            }`}
                        >
                            <ProductImage
                                src={image || null}
                                alt={`${name} - ${i + 1}`}
                                iconClassName="w-10 h-10 text-gray-400"
                                sizes="(max-width: 768px) 25vw, 10vw"
                            />
                        </div>
                    ))}
            </div>
        </div>
    );
};
