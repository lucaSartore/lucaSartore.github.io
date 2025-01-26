import React, {
	useState,
	useRef,
	useImperativeHandle,
	forwardRef,
} from "react";


export type TypingTextProps = {
    text: string ;
    className?: string;
    constructorFunc?: (_: string) => JSX.Element
}


export function isTypingTextProps(item: TypingTextProps | JSX.Element): item is TypingTextProps {
  return (item as TypingTextProps).text !== undefined;
}

export type TypingTextRef = {
    forward: () => boolean;
    backword: () => boolean;
}

export const TypingText = forwardRef((props: TypingTextProps, ref: React.ForwardedRef<TypingTextRef>) => {

    const text = props.text || "default TypingText text";
    const className = props.className || "";

	const [displayedText, setDisplayedText] = useState("");

    const textLength = useRef(0);

	useImperativeHandle(ref, () => ({
		forward: () => {
            
            if (textLength.current == text.length){
                return true;
            }

            const nextLetter = text[textLength.current]
			setDisplayedText((prev) => prev + nextLetter);
            textLength.current += 1;

            return false;
		},
		backword: () => {

            if (textLength.current == 0){
                return true;
            }

			setDisplayedText((prev) => prev.slice(0, -1));
            textLength.current -= 1;

            return false;
		},
	}));

    
    if (props.constructorFunc == undefined){
        return (
            <div className={`relative ${className? className : ""}`}>
                {displayedText}
            </div>
        );
    }else{
        return props.constructorFunc(displayedText)
    }
});

