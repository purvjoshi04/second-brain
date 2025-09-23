import type { ReactElement } from "react";

interface ButtonProps {
    variant: "primary" | "secondary";
    text: string;
    startIcon?: ReactElement
    onClick?: () => void;
    fullWidth?: boolean;
    loading?: boolean;
}

const variantClasses = {
    "primary": "bg-[#7164c0] text-white",
    "secondary": "bg-[#d9ddee] text-purple-600",
};

const defaultStyles = "px-4 py-2 rounded-md font-light flex items-center cursor-pointer";


export function Button(props: ButtonProps) {
    return <button onClick={props.onClick} className={`${variantClasses[props.variant]} ${defaultStyles} ${props.fullWidth ? " w-full flex justify-center items-center" : ""} ${props.loading ? "opacity-45	" : ""}`} disabled={props.loading}>
        <div className="pr-2">
            {props.startIcon}
        </div>
        {props.text}
    </button>
}