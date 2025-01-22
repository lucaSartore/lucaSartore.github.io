import React, {
	useRef,
	useImperativeHandle,
	forwardRef,
    useEffect,
} from "react";
import  { TypingTextProps, TypingTextRef, TypingText } from "./typing_text";

const DEFAULT_TYPING_TIME_MS = 1200;
const TYPING_VOLUME = 0.2;



export type TypingParagraphProps = {
    items: Array<TypingTextProps | JSX.Element>
    className?: string
    typingTime?: number
    defaultStatus?: "TYPING" | "DELETING"
    startTypingTimeout?: number
}

export type TypingParagraphRef = {
    start: () => void;
    stop: () => void;
}


export const TypingParagraph = forwardRef((props: TypingParagraphProps, ref: React.ForwardedRef<TypingParagraphRef>) => {
    
    const className = props.className || "";
    const items = props.items;
    const typingTime = props.typingTime || DEFAULT_TYPING_TIME_MS
    const defaultStatus = props.defaultStatus || "DELETING"
    const startTypingTimeout = props.startTypingTimeout || 0

	const audioRef: React.MutableRefObject<HTMLAudioElement | null> = useRef(null);

    
    // creating all sub objects
    let itemsRef: Array<
        {kind: "tt"; value: React.RefObject<TypingTextRef>} | 
        {kind: "div"; value: React.RefObject<HTMLDivElement>}
    > = [];
    let itemsHtml: Array<JSX.Element> = []
    
    let numLetters = 0;

    items.forEach((item, i) => {
        if ("className" in item && "text" in item){
            const ref = useRef<TypingTextRef>(null);
            numLetters += item.text?.length || 0;
            itemsHtml.push(
                <TypingText ref={ref} className={item.className} text = {item.text} key={i}/>
            )
            itemsRef.push({
                kind: "tt",
                value: ref
            });
        }else{
            //item.key = i.toString();
            const ref = useRef<HTMLDivElement>(null);
            numLetters += 1
            itemsHtml.push(
                <div key={i} hidden={true} ref={ref}>
                    {item}
                </div>
            )
            itemsRef.push({
                kind: "div",
                value: ref
            });
        }
    });
    
    let typingInterval = typingTime / numLetters;
    let scalingFactor = 1;
    if (typingInterval < 60) {
        scalingFactor = Math.ceil(60 / typingInterval);
        typingInterval = typingTime / (numLetters/scalingFactor);
    }

	const startAudio = function () {
		if (audioRef.current) {
			// Clone and play to allow overlapping sounds
			const sound = audioRef.current;
			sound.volume = TYPING_VOLUME;
			try {
				sound.play();
			} catch (err) {
				console.log("Audio playback failed:", err);
			}
		}
	};

	const stopAudio = function () {
		if (audioRef.current) {
			// Clone and play to allow overlapping sounds
			const sound = audioRef.current;
			try {
				sound.pause();
			} catch (err) {
				console.log("Audio playback failed:", err);
			}
		}
	};


	const isUpdaterRunning = useRef(false);
	const status = useRef<"TYPING" | "DELETING">(defaultStatus); 
    const innerTextIndex = useRef(0);

     
    function textUpdateHandler(){
        let has_finish_updates = false;
        if (status.current == "TYPING"){
            for (let i=0; i<scalingFactor; i++){
                const item = itemsRef[innerTextIndex.current]!;
                if (item.kind == "tt"){
                    has_finish_updates = item.value.current!.forward();
                }else{
                    item.value.current!.hidden=false;
                    has_finish_updates = true;
                }
            }
        }else{
            for (let i=0; i<scalingFactor; i++){
                const item = itemsRef[innerTextIndex.current]!;
                if (item.kind == "tt"){
                    has_finish_updates = item.value.current!.backword();
                }else{
                    item.value.current!.hidden=true;
                    has_finish_updates = true;
                }
            }
        }

        if (has_finish_updates && status.current == "DELETING" && innerTextIndex.current == 0 ||
            has_finish_updates && status.current == "TYPING" && innerTextIndex.current+1 == itemsRef.length
           ){
            stopAudio();
            isUpdaterRunning.current = false;
            return;
        }

        if (has_finish_updates && status.current == "DELETING"){
            innerTextIndex.current -= 1;
        }
        if (has_finish_updates && status.current == "TYPING"){
            innerTextIndex.current += 1;
        }

		setTimeout(textUpdateHandler, typingInterval);
    }

    function startTextUpdater(){
        if ( isUpdaterRunning.current ){
            return
        }
        startAudio();
        isUpdaterRunning.current = true
        textUpdateHandler();
    }


	useImperativeHandle(ref, () => ({
		start: () => {
            status.current = "TYPING";
            startTextUpdater();
		},
		stop: () => {
            status.current = "DELETING";
            startTextUpdater();
		},
	}));

    useEffect(() => {
        console.log('Component was constructed!');

        if (status.current == "TYPING"){
            setTimeout(() => startTextUpdater(), startTypingTimeout)
        }
    
        return () => {};
    }, []);



	return (
		<div className={`relative ${className}`}>
            {itemsHtml}
			<audio
				ref={audioRef}
				preload="auto"
				src="./src/assets/keyboard_sound.mp3"
				className="hidden"
				loop={true}
			/>
		</div>
	);
})
