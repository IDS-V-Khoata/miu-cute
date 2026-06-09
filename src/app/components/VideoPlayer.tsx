import React from "react";

interface VideoPlayerProps {
    src: string;
    poster?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, poster }) => {
    return (
        <video autoPlay muted loop playsInline className="rounded" width="100%" height="360" controls poster={poster}>
            <source src={src} type="video/mp4" />
            {/* <source src={src} type="video/webm" />
            <source src={src} type="video/ogg" /> */}
        </video>
    );
};

export default VideoPlayer;
