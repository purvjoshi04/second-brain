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
    "primary": "bg-[#e0e7fe] text-white",
    "secondary": "bg-[#5046e4] text-[#5046e4}"
}

const defaultStyles = "rounded-md p-4 flex"

const sizeStyles = {
    "sm": "p-2",
    "md": "p-4",
    "lg": "p-6"
}


export const Button = (props: ButtonProps) => {
    return <button className={`${variantstyles[props.variant]} ${defaultStyles} ${sizeStyles[props.size]}`}>{props.startIcon ? <div className="pr-2">{props.startIcon}</div> : null} {props.text} {props.endIcon}</button>
} 