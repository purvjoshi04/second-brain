import type { ReactElement } from "react";

interface ButtonProps {
    variant: "primary" | "secondary";
    size: "sm" | "md" | "lg";
    text: string;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    onClick: () => void;
}

const variantstyles = {
    "primary": "bg-[#e0e7fe] text-[#5046e4]",
    "secondary": "bg-[#5046e4] text-white"
}


const sizeStyles = {
    "sm": "p-2 text-sm rounded-sm",
    "md": "p-4 text-md rounded-md",
    "lg": "p-6 text-lg rounded-lg"
}


export const Button = (props: ButtonProps) => {
    return (
    <button className={`${variantstyles[props.variant]} ${sizeStyles[props.size]}`}>
        <div className="flex items-center font-[400] p-0">
        {props.startIcon ? <div className="pr-2">{props.startIcon}</div> : null} 
        {props.text}
        </div>
        {props.endIcon}
        </button>
    )
} 