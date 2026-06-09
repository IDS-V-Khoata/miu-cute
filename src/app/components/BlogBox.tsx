"use client"

import { Box } from "@/components/Form";
import { faComment, faShareNodes, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from 'next/image';
import VideoPlayer from "@/components/VideoPlayer";
import AutoResizeTextarea from "./AutoResizeTextarea";

interface BlogBoxProps {
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

export default function BlogBox({ name, time = new Date(), avatar, content, like, share, comment, video, typeImage }: BlogBoxProps) {
    return (
        <Box className="bg-white shadow-xl p-4 border border-solid hover:border-gray-300 transition-all duration-200 ease-linear">
            <div className="info flex items-center gap-4">
                <Image src={`/assets/images/${avatar}.${typeImage}`} alt="icon 1" width={50} height={50} className='min-w-[50px] w-[50px] h-[50px] border border-solid p-1 rounded-full' />
                <div className="flex flex-col items-start">
                    <p className="font-semibold">{name ? name : "Anonymous"}</p>
                    <p className="text-sm">{time.toLocaleString()}</p>
                </div>
            </div>
            {/* {!video && <textarea className="w-full mt-4 border-0 outline-0 resize-none" rows="auto" value={content ? content : 'No content'} readOnly></textarea>} */}
            {!video && <div className="mt-4"><AutoResizeTextarea content={content ? content : 'No content'} style={{ overflow: "hidden" }} readOnly className="outline-0 resize-none" /></div>}
            {video && <div className="rounded mt-4"><VideoPlayer src={`/assets/videos/${video}`} /></div>}
            <div className="border border-solid w-full my-4"></div>
            <div className="action flex items-center gap-4">
                <button className="btn btn-primary"><FontAwesomeIcon icon={faThumbsUp} /> {like}</button>
                <button className="btn btn-primary"><FontAwesomeIcon icon={faComment} /> {share}</button>
                <button className="btn btn-primary"><FontAwesomeIcon icon={faShareNodes} /> {comment}</button>
            </div>
        </Box>
    )
}