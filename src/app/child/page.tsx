"use client";

import AppLayout from "@/components/layout/AppLayout/AppLayout";
import OverLoad from "@/components/OverLoad";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Modal from "../components/Modals";
import { RiZoomInLine } from "react-icons/ri";
import Link from "next/link";

const PAGE_SIZE = 8;

export default function Child() {
    const [urlDetail, setUrlDetail] = useState<string>("");
    const [allImages, setAllImages] = useState<string[]>([]);
    const [visibleImages, setVisibleImages] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [isShowCentryDetail, setIsShowCentryDetail] = useState(false);

    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    // Generate images
    useEffect(() => {
        const shuffled = Array.from({ length: 195 }, (_, index) => {
            const imageNumber = index + 1;

            const type =
                imageNumber === 13 || imageNumber === 18
                    ? "png"
                    : "jpg";

            return `/assets/images/Image/${imageNumber}.${type}`;
        });

        shuffled.sort(() => Math.random() - 0.5);

        setAllImages(shuffled);

        // first load
        setVisibleImages(shuffled.slice(0, PAGE_SIZE));
    }, []);

    // Infinite scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const first = entries[0];

                if (
                    first.isIntersecting &&
                    visibleImages.length < allImages.length
                ) {
                    loadMore();
                }
            },
            {
                threshold: 1,
            }
        );

        const currentRef = loadMoreRef.current;

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [visibleImages, allImages]);

    const loadMore = () => {
        const nextImages = allImages.slice(0, visibleImages.length + PAGE_SIZE);

        setVisibleImages(nextImages);
    };

    return (
        <AppLayout titlePage="Miu Cute Gallery">
            <OverLoad isActive={loading} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4 pb-8">
                {visibleImages.map((src, index) => (
                    <div
                        onClick={() => {
                            setLoading(true);
                            setUrlDetail(src);
                            setIsShowCentryDetail(true);
                        }}
                        key={src}
                        className="group relative aspect-square overflow-hidden rounded cursor-pointer hover:shadow-2xl"
                    >
                        {/* Overlay */}
                        <div className="absolute z-50 inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white text-lg font-bold">
                            <RiZoomInLine size={28} />
                        </div>

                        {/* Image */}
                        <Image
                            src={src}
                            alt={`Gallery image ${index + 1}`}
                            fill
                            priority={index < 30}
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                            onLoad={() => setLoading(false)}
                            sizes="
                                (max-width: 768px) 100vw,
                                (max-width: 1200px) 50vw,
                                33vw
                            "
                        />
                    </div>
                ))}
            </div>

            {/* Trigger Load More */}
            <div
                ref={loadMoreRef}
                className="h-20 flex items-center justify-center"
            >
                {visibleImages.length < allImages.length ? (
                    <p className="text-gray-500">
                        Loading more...
                    </p>
                ) : (
                    <p className="text-gray-400">
                        No more images
                    </p>
                )}
            </div>

            {/* Modal */}
            <Modal
                isOpen={isShowCentryDetail}
                onCloseModal={() => setIsShowCentryDetail(false)}
                title=""
                size="large"
            >
                <div className="relative w-full aspect-square">
                    <Image
                        src={urlDetail}
                        alt="Preview image"
                        fill
                        className="object-cover rounded"
                        onLoad={() => setLoading(false)}
                        sizes="
                            (max-width: 768px) 100vw,
                            (max-width: 1200px) 50vw,
                            33vw
                        "
                    />
                </div>
                <div className="mt-4">
                    <Link target="_blank" rel="noopener noreferrer"
                        href="https://www.facebook.com/vy.truong.101653/"
                        className="text-white"
                    >
                        Miu Kute
                    </Link>
                </div>
            </Modal>
        </AppLayout>
    );
}