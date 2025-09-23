import type { ReactElement } from "react";

interface SidebarItemsProps {
    text: string;
    icon: ReactElement;
}

export const SidebarItems = (props: SidebarItemsProps) => {
    return (
        <div className="flex text-gray-700 py-2 cursor-pointer hover:bg-gray-200 rounded transition duration-200">
            <div className="p-2">
                {props.icon}
            </div>
            <div className="p-2">
                {props.text}
            </div>
        </div>
    )
}