import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
    const result = await cloudinary.search
        .expression("folder:family/miu_cute")
        .sort_by("created_at", "desc")
        .max_results(100)
        .execute();

    return NextResponse.json(result.resources);
}