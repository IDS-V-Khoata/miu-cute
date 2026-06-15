"use client";

import OverLoad from "@/components/OverLoad";
import Image from "next/image";
import { useEffect, useState } from "react";

interface FilmInterface {
    id: string;
    original_title: string;
    original_title_romanised: string;
    image: string;
    movie_banner: string;
    description: string;
    director: string;
    producer: string;
    release_date: string;
    running_time: string;
}


export default function Cinema() {
    const [listFilm, setListFilm] = useState<FilmInterface[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchFilms = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/cinema', {
                    method: 'POST',
                });
                const data = await response.json();
                console.log(data)
                setListFilm(data);
            } catch (error) {
                console.error('Error fetching films:', error);
            }
        };

        fetchFilms();
    }, []);

    return (
        <>
            <OverLoad isActive={loading} />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 px-4 pb-8">
                {
                    listFilm.map((film) => {
                        return (
                            <div key={film.id} className="bg-lightgreen rounded-lg overflow-hidden shadow-md hover:shadow-2xl border border-gray-200">
                                <div className="relative w-full h-64 md:h-60">
                                    <Image
                                        src={film.movie_banner}
                                        alt={film.original_title}
                                        layout="fill"
                                        objectFit="cover"
                                        onLoadingComplete={() => setLoading(false)}
                                    />
                                </div>
                                <div className="p-4">
                                    <h2 className="text-2xl text-darkgreen font-bold mb-2 cursor-pointer">{film.original_title} ({film.release_date})</h2>
                                    <p className="text-darkcharcoal mb-4">{`${film.description.slice(0, 150)} ...`}</p>
                                    <p className="text-sm text-darkgreen">Director: {film.director} | Producer: {film.producer} | Running Time: {film.running_time} mins</p>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </>
    );
}
