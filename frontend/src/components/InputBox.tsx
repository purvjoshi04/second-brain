interface InputBoxProps {
    placeholder: string;
    reference?: any
}

export const InputBox = (props: InputBoxProps) => {
    return (
        <div>
            <input
                className="px-4 py-2 border rounded-sm m-2" 
                placeholder={props.placeholder} 
                type={"text"}
                ref={props.reference}
                />
        </div>
    )
}