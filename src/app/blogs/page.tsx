"use client";

import AutoSlider from "@/components/AutoSlider";
import BlogBox from "@/components/BlogBox";
import { ButtonStyle } from "@/components/Forms";
import BlogLayout from "@/components/layout/BlogLayout/BlogLayout";
import Loading from "@/components/Loading";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

interface BlogInterface {
    name?: string | null;
    time?: Date;
    avatar?: string;
    content?: string | null;
    like?: number;
    comment?: number;
    share?: number;
    video?: string;
    typeImage?: string;
}

export default function Blogs() {
    const [data, setData] = useState<BlogInterface[]>();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetch("api/listUsers.json") // Gọi API từ route.ts
            .then((res) => res.json())
            .then((data) => setData(data))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    const handleLoadMoreContent = () => {
        setIsLoading(true);
        const tiemOut = setTimeout(() => {
            fetch("api/listUserMore.json")
                .then((res) => res.json())
                .then((resData) => setData(pre => [...(pre || []), ...resData]))
                .catch((error) => console.error("Error fetching data:", error));
            setIsLoading(false);
            clearTimeout(tiemOut);
        }, 1000);
    }

    return (
        <BlogLayout>
            <AutoSlider />
            <div className="wrapper py-6 flex flex-col gap-6 max-w-3xl m-auto">
                {
                    data?.map((item: BlogInterface, index) => (
                        <BlogBox key={index} name={item.name} avatar={item.avatar} content={item.content} time={item.time} like={item.like} comment={item.comment} share={item.share} typeImage={item.typeImage} video={item.video} />
                    ))
                }
                <div className="text-center">
                    <ButtonStyle buttontype="primary" text="Load More"
                        onClick={handleLoadMoreContent}
                        startIcon={<FontAwesomeIcon icon={faArrowsRotate} />}
                    >
                    </ButtonStyle>
                </div>
            </div>
            <Loading isOpen={isLoading} />
        </BlogLayout>
    );
}