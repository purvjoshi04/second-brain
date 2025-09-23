import { XIcon } from "../icons/XIcon"
import { YouTubeIcon } from "../icons/YoutubeIcon"
import { SidebarItems } from "./SidebarItems"
import brainIcon from "../assets/brain.svg"


const sidebarItems = [
    {
        id: "x",
        text: "X",
        icon: <XIcon />
    },
    {
        id: "youtube",
        text: "Videos",
        icon: <YouTubeIcon />
    }
]

export const Sidebar = () => {
    return (
        <div className="h-screen bg-white border-r-4 w-72 fixed left-0 top-0 border-none pl-6">
            <div className="flex text-xl pt-4 items-center gap-3 font-semibold">
                <img className="w-10" src={brainIcon} />
                Second Brain
            </div>
            <div className="pt-8 pl-4">
                {sidebarItems.map((item) => (
                    <SidebarItems
                        key={item.id}
                        text={item.text}
                        icon={item.icon}
                    />
                ))}
            </div>
        </div>
    )
}