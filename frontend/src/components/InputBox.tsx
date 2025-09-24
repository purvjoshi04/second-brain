import { forwardRef } from "react";

interface InputBoxProps {
    placeholder: string;
}

export const InputBox = forwardRef<HTMLInputElement, InputBoxProps>(
    ({ placeholder }, ref) => {
        return (
            <div className="w-full">
                <input
                    className="px-4 py-2 border rounded-sm w-full"
                    placeholder={placeholder}
                    type="text"
                    ref={ref}
                />
            </div>
        );
    }
);

