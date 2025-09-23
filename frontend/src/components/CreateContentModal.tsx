import { CrossIcon } from "../icons/CrossIcon"
import { Button } from "./Button"
import { InputBox } from "./InputBox"

interface CreateContentModalProps {
    open: boolean,
    onClose: () => void
}

export const CreateContentModal = (props: CreateContentModalProps) => {
    return (
        <div>
            {props.open && <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center">
                <div className="flex flex-col justify-center">
                    <span className="bg-white opacity-100 p-4 rounded-md">
                        <div className="flex justify-end">
                            <div onClick={props.onClose}>
                            <CrossIcon />
                            </div>
                        </div>
                        <div>
                            <InputBox placeholder={"Title"}/>
                            <InputBox placeholder={"Link"}/>
                        </div>
                        <div className="flex justify-center p-2">
                        <Button variant={"primary"} text={"Submit"} />
                        </div>
                    </span>
                </div>
            </div>}
        </div>
    )
}