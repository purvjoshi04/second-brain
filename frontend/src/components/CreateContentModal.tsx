import { useRef, useState } from "react"
import { CrossIcon } from "../icons/CrossIcon"
import { Button } from "./Button"
import { BACKEND_URL } from "../config"
import axios from "axios"
import { InputBox } from "./InputBox"

enum ContentType {
    Youtube = "youtube",
    X = "X"
}


interface CreateContentModalProps {
    open: boolean,
    onClose: () => void,
    onContentAdded: () => void
}

export const CreateContentModal = (props: CreateContentModalProps) => {
    const [type, setType] = useState(ContentType.Youtube)
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);

    const addContent = async () => {
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;

        if (!title || !link) {
            alert("Please fill in both username and password");
            return;
        }

        const backendUrl = BACKEND_URL
        if (!backendUrl) {
            alert("Backend URL is not configured");
            return;
        }

        try {
            await axios.post(`${backendUrl}/api/v1/content`, {
                title,
                link,
                type
            }, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            props.onContentAdded();
            props.onClose();

            if (titleRef.current) titleRef.current.value = '';
            if (linkRef.current) linkRef.current.value = '';
        } catch (error) {
            console.error("Adding content failed:", error);
            alert("Adding content failed. Please try again.");
        }
    }

    return (
        <div>
            {props.open && (
                <div>
                    <div className="fixed inset-0 bg-slate-500 opacity-60"></div>
                    <div className="fixed inset-0 flex items-center justify-center">
                        <div className="bg-white p-6 rounded shadow-lg w-[400px] max-w-[90%]">
                            <div className="flex justify-end mb-3 ">
                                <div onClick={props.onClose} className="cursor-pointer">
                                    <CrossIcon />
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <InputBox ref={titleRef} placeholder="Title" />
                                <InputBox ref={linkRef} placeholder="Link" />
                            </div>

                            <div className="mt-4">
                                <h1 className="mb-2">Type</h1>
                                <div className="flex gap-2">
                                    <Button
                                        text="Youtube"
                                        variant={type === ContentType.Youtube ? "primary" : "secondary"}
                                        onClick={() => setType(ContentType.Youtube)}
                                        fullWidth={true}
                                    />
                                    <Button
                                        text="X"
                                        variant={type === ContentType.X ? "primary" : "secondary"}
                                        onClick={() => setType(ContentType.X)}
                                        fullWidth={true}
                                    />
                                </div>
                            </div>

                            <div className="mt-4">
                                <Button onClick={addContent} variant="primary" text="Submit" fullWidth={true} />
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}