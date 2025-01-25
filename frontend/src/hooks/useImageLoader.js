import { useState, useEffect } from 'react';
import { PLACEHOLDER_IMAGES } from '../utils/imageUrls';

export const useImageLoader = (imageUrl) => {
    const [loadedImage, setLoadedImage] = useState(PLACEHOLDER_IMAGES.default);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => {
            setLoadedImage(imageUrl);
            setIsLoading(false);
        };
        img.onerror = () => {
            setLoadedImage(PLACEHOLDER_IMAGES.default);
            setIsLoading(false);
        };
    }, [imageUrl]);

    return { loadedImage, isLoading };
}; 