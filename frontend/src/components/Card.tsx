import { DocumentIcon } from "../icons/DocumentIcons"
import { ShareIcon } from "../icons/ShareIcon"
import { TrashIcon } from "../icons/TrashIcon"
import { useEffect, useState } from "react"

interface CardProps {
    title: string,
    link: string,
    type: "twitter" | "youtube",
    onDelete?: () => void
}

const getYouTubeEmbedUrl = (url: string): string => {
    console.log('Original URL:', url); // Debug log
    
    try {
        const urlObj = new URL(url);
        console.log('Parsed URL hostname:', urlObj.hostname); // Debug log
        
        // Handle youtube.com/watch?v= format
        if (urlObj.hostname.includes('youtube.com') && urlObj.searchParams.get('v')) {
            const videoId = urlObj.searchParams.get('v');
            const embedUrl = `https://www.youtube.com/embed/${videoId}`;
            console.log('YouTube embed URL:', embedUrl); // Debug log
            return embedUrl;
        }
        
        // Handle youtu.be/ format
        if (urlObj.hostname === 'youtu.be') {
            const videoId = urlObj.pathname.slice(1);
            const embedUrl = `https://www.youtube.com/embed/${videoId}`;
            console.log('YouTube short URL embed:', embedUrl); // Debug log
            return embedUrl;
        }
        
        // Handle youtube.com/embed/ format (already embed URL)
        if (urlObj.hostname.includes('youtube.com') && urlObj.pathname.startsWith('/embed/')) {
            console.log('Already embed URL:', url);
            return url;
        }
        
        console.warn('Could not parse YouTube URL:', url);
        return url;
    } catch (error) {
        console.error('Error parsing YouTube URL:', error);
        return url;
    }
}

const getTwitterTweetId = (url: string): string | null => {
    try {
        const match = url.match(/twitter\.com\/\w+\/status\/(\d+)|x\.com\/\w+\/status\/(\d+)/);
        return match ? (match[1] || match[2]) : null;
    } catch {
        return null;
    }
}

export const Card = (props: CardProps) => {
    const [videoError, setVideoError] = useState(false);

    useEffect(() => {
        if (props.type === "twitter") {
            const script = document.createElement('script');
            script.src = 'https://platform.twitter.com/widgets.js';
            script.async = true;
            if (!document.querySelector('script[src="https://platform.twitter.com/widgets.js"]')) {
                document.body.appendChild(script);
            }
        }
    }, [props.type]);

    const renderEmbed = () => {
        if (props.type === "youtube") {
            const embedUrl = getYouTubeEmbedUrl(props.link);
            
            if (videoError) {
                return (
                    <div className="w-full aspect-video bg-gray-100 rounded-md flex flex-col items-center justify-center text-gray-500">
                        <div className="text-center">
                            <p className="mb-2">Video failed to load</p>
                            <a 
                                href={props.link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline text-sm"
                            >
                                Watch on YouTube
                            </a>
                        </div>
                    </div>
                );
            }

            return (
                <iframe 
                    className="w-full aspect-video rounded-md border-0" 
                    src={embedUrl}
                    title={`YouTube video: ${props.title}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin" 
                    allowFullScreen
                    onError={() => {
                        console.error('YouTube iframe failed to load');
                        setVideoError(true);
                    }}
                    onLoad={() => {
                        console.log('YouTube iframe loaded successfully');
                    }}
                />
            );
        }

        if (props.type === "twitter") {
            const tweetId = getTwitterTweetId(props.link);
            if (tweetId) {
                return (
                    <blockquote 
                        className="twitter-tweet" 
                        data-tweet-id={tweetId}
                    >
                        <a href={props.link}>Loading tweet...</a>
                    </blockquote>
                );
            } else {
                return (
                    <div className="p-4 bg-gray-50 rounded-md text-center text-gray-500">
                        <a 
                            href={props.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            View Tweet
                        </a>
                    </div>
                );
            }
        }

        return null;
    };

    return (
        <div className="p-4 bg-white rounded-md max-w-96 border-gray-200 border shadow-sm">
            <div className="flex justify-between items-center">
                <div className="flex items-center text-md font-medium">
                    <div className="pr-3 text-gray-500">
                        <DocumentIcon />
                    </div>
                    <span className="truncate">{props.title}</span>
                </div>
                <div className="flex items-center gap-3">
                    <a 
                        href={props.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-gray-700 transition-colors p-1"
                        aria-label={`Open ${props.title} in new tab`}
                    >
                        <ShareIcon />
                    </a>
                    <button
                        onClick={props.onDelete}
                        className="text-gray-500 hover:text-red-600 transition-colors p-1"
                        aria-label={`Delete ${props.title}`}
                    >
                        <TrashIcon />
                    </button>
                </div>
            </div>
            
            {props.link && (
                <div className="pt-4">
                    {renderEmbed()}
                </div>
            )}
        </div>
    )
}