import React, {
	useRef,
	useImperativeHandle,
	forwardRef,
} from "react";
import  { TypingTextProps, TypingTextRef, TypingText } from "./typing_text";

const DEFAULT_TYPING_TIME_MS = 1200;
const TYPING_VOLUME = 0.2;



export type TypingParagraphProps = {
    items: Array<TypingTextProps | JSX.Element>
    className: string | undefined
    typingTime: number | undefined
}

export type TypingParagraphRef = {
    start: () => void;
    stop: () => void;
}


export const TypingParagraph = forwardRef((props: TypingParagraphProps, ref: React.ForwardedRef<TypingParagraphRef>) => {
    
    const className = props.className || "";
    const items = props.items;
    const typingTime = props.typingTime || DEFAULT_TYPING_TIME_MS

	const audioRef: React.MutableRefObject<HTMLAudioElement | null> = useRef(null);

    
    // creating all sub objects
    let items_refs: Array<React.RefObject<TypingTextRef>> = []
    let items_html: Array<JSX.Element> = []
    
    let numLetters = 0;

    items.forEach((item, i) => {
        if ("className" in item && "text" in item){
            const ref = useRef<TypingTextRef>(null);
            numLetters += item.text?.length || 0;
            items_html.push(
                <TypingText ref={ref} className={item.className} text = {item.text} key={i}/>
            )
            items_refs.push(ref);
        }else{
            item.key = i.toString();
            items_html.push(item)
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
	const status = useRef<"TYPING" | "DELETING">("DELETING"); 
    const innerTextIndex = useRef(0);

     
    function textUpdateHandler(){
        let has_finish_updates = false;
        if (status.current == "TYPING"){
            for (let i=0; i<scalingFactor; i++){
                //@ts-expect-error
                has_finish_updates = items_refs[innerTextIndex.current].current.forward();
            }
        }else{
            for (let i=0; i<scalingFactor; i++){
                //@ts-expect-error
                has_finish_updates = items_refs[innerTextIndex.current].current.backword();
            }
        }

        if (has_finish_updates && status.current == "DELETING" && innerTextIndex.current == 0 ||
            has_finish_updates && status.current == "TYPING" && innerTextIndex.current+1 == items_refs.length
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

	return (
		<div className={`relative ${className}`}>
            {items_html}
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
