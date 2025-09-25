import axios from "axios";
import { ShareIcon } from "../icons/ShareIcon";
import { TrashIcon } from "../icons/TrashIcon";
import { XIcon } from "../icons/XIcon";
import { YouTubeIcon } from "../icons/YoutubeIcon";
import { BACKEND_URL } from "../config";

interface CardProps {
    title: string;
    link: string;
    type: "X" | "youtube";
    id: string;
    onDelete?: () => void;
}

export function Card(props: CardProps) {
    const getYouTubeEmbedUrl = (url: string): string => {
        if (url.includes('youtu.be/')) {
            const videoId = url.split('youtu.be/')[1].split('?')[0];
            return `https://www.youtube.com/embed/${videoId}`;
        }

        if (url.includes('youtube.com/watch')) {
            return url.replace("watch", "embed").replace("?v=", "/");
        }

        return url;
    };

    const removeContent = async () => {
        try {
            await axios.delete(`${BACKEND_URL}/api/v1/content/${props.id}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            window.location.reload();
        } catch (error) {
            alert(`Failed to delete content: ${error}`);
        }
    }

    return <div>
        <div className="p-4 bg-white rounded-md border-gray-200 max-w-72  border min-h-48 min-w-72">
            <div className="flex justify-between">
                <div className="flex items-center text-md">
                    <div className="text-gray-500 pr-2">
                        {props.type === "youtube" ? <YouTubeIcon /> : <XIcon />}
                    </div>
                    {props.title}
                </div>
                <div className="flex items-center">
                    <div className="pr-2 text-gray-500">
                        <a href={props.link} target="_blank">
                            <ShareIcon />
                        </a>
                    </div>
                    <div className="text-gray-500">
                        <TrashIcon onClick={removeContent} />
                    </div>
                </div>
            </div>

            <div className="pt-4">
                {props.type === "youtube" && <iframe className="w-full" src={getYouTubeEmbedUrl(props.link)} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}

                {props.type === "X" && <blockquote className="twitter-tweet">
                    <a href={props.link.replace("x.com", "twitter.com")}></a>
                </blockquote>}
            </div>
        </div>
    </div>
}