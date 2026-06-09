"use client";

import AppLayout from "@/components/layout/AppLayout/AppLayout";
import { Box, ButtonCustom, CheckBoxCustom, RadioGroup } from "../components/Form";
import { useEffect, useState } from "react";
import Image from "next/image";
import OverLoad from "@/components/OverLoad";
import { faArrowUpRightDots, faCat, faDog, faMagnifyingGlass, faPaw } from "@fortawesome/free-solid-svg-icons";
import demo from "../../../public/assets/images/dogcat.jpg";

interface ImagePets {
    height?: number;
    width?: number;
    url: string;
    id?: string;
}

export default function FindDog() {
    const [image, setImage] = useState<ImagePets[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [chosePet, setChosePet] = useState<string>("all");
    const [loadedCount, setLoadedCount] = useState(0);
    const [limit, setLimit] = useState(false);

    const handleSearch = async () => {
        try {
            setLoading(true);
            setLoadedCount(0);
            const res = await fetch("/api/findPets", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ finder: chosePet, limit: limit })
            });

            const data = await res.json();
            if (res.ok) {
                setImage(data);
            } else {
                console.error(data.error);
            }
        } catch (error) {
            console.error("Error ===> :", error);
        }
    }

    useEffect(() => {
        if (loadedCount === image.length && image.length > 0) {
            setLoading(false);
        }
    }, [loadedCount, image.length]);

    return (
        <AppLayout titlePage="FindPets">
            <OverLoad isActive={loading} />
            <Box className="flex flex-col gap-8 w-full items-center justify-center py-6">
                <ButtonCustom primary="darkyellow" text="Find" handleClick={handleSearch} icon={faMagnifyingGlass} />
                <div className="flex items-center gap-8">
                    <RadioGroup
                        name="gender"
                        value={chosePet}
                        onChange={(value) => setChosePet(String(value))}
                        options={[
                            { label: faPaw, value: "all" },
                            { label: faDog, value: "dog" },
                            { label: faCat, value: "cat" },
                        ]}
                    />
                    <CheckBoxCustom label={faArrowUpRightDots} value={limit} changeValue={() => setLimit(pre => !pre)} />
                </div>
                <Box className="grid grid-cols-2 gap-8 items-center flex-wrap">
                    {
                        image.length > 0 ? (
                            image.map((img, index) => {
                                return (
                                    <Box key={index} className="w-full flex flex-wrap items-center justify-center border border-[#ccc] p-4 rounded max-w-lg shadow-2xl hover:shadow relative">
                                        {loading && <div className="absolute top-0 left-0 right-0 bottom-0 bg-white rounded"></div>}
                                        <Image src={img.url || 'not found'} alt="Random dog" className="shadow-2xl max-w-[480px]" width={img.width || 300} height={img.height || 300} onLoad={() => setLoadedCount((prev) => prev + 1)} />
                                    </Box>
                                )
                            })
                        ) : (
                            <div className="flex flex-col items-center gap-4 border border-[#ccc] p-4 rounded max-w-lg shadow-2xl">
                                <div>
                                    <Image src={demo} alt="Random dog" className="shadow-2xl max-w-[480px] h-auto" onLoad={() => setLoading(false)} />
                                </div>
                                <p className="text-[#7f8c8d]">Please click button &quot;Find&quot; to search for a pet image.</p>
                            </div>
                        )
                    }
                </Box>
            </Box>
        </AppLayout>
    );
}