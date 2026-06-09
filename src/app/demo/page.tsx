export const dynamic = "force-dynamic";
import { Box } from "@/components/Form";
import Image from "next/image";

type Props = {
    searchParams: Promise<{
        page?: string;
    }>;
};

interface ImagePets {
    height?: number;
    width?: number;
    url: string;
    id?: string;
}

async function searchArticles(page = "1"): Promise<ImagePets[]> {
    const res = await fetch(
        // https://api.example.com/search?q=${q}&page=${page},
        `https://api.thedogapi.com/v1/images/search?limit=${page}
            `
    );
    return res.json();
}

export default async function SearchPage({ searchParams }: Props) {
    const { page } = await searchParams;
    const data = await searchArticles(page);
    console.log(data)
    return (
        <>
            <h1>Kết quả tìm kiếm: </h1>
            <ul>
                {data.map((item, index) => (
                    <li key={index} className="mb-4">
                        <Box key={index} className="w-full flex flex-wrap items-center justify-center border border-[#ccc] p-4 rounded max-w-lg shadow-2xl hover:shadow relative">
                            <Image loading="eager" src={item.url} alt="Random dog" className="shadow-2xl max-w-[480px]" width={item.width || 300} height={item.height || 300} />
                        </Box>
                    </li>
                ))}
            </ul>
        </>
    );
}
