import React, {
	useRef,
	useImperativeHandle,
	forwardRef,
} from "react";
import  { TypingTextProps, TypingTextRef, TypingText } from "./typing_text";

const TYPING_PERIOD_MS = 5;
const TYPING_VOLUME = 0.2;



export type TypingParagraphProps = {
    items: Array<TypingTextProps | JSX.Element>
    className: string | undefined
}

export type TypingParagraphRef = {
    start: (callback: () => void) => void;
    stop: (callback: () => void) => void;
}


export const TypingParagraph = forwardRef((props: TypingParagraphProps, ref: React.ForwardedRef<TypingParagraphRef>) => {
    
    const className = props.className || "";
    const items = props.items;

	const audioRef: React.MutableRefObject<HTMLAudioElement | null> = useRef(null);

    
    // creating all sub objects
    let items_refs: Array<React.RefObject<TypingTextRef>> = []
    let items_html: Array<JSX.Element> = []
    items.forEach(item => {
        if ("className" in item && "text" in item){
            const ref = useRef<TypingTextRef>(null);
            items_html.push(
                <TypingText ref={ref} className={item.className} text = {item.text} />
            )
            items_refs.push(ref);
        }else{
            items_html.push(item)
        }
    });

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

     
    function textUpdateHandler(callback: () => void){
        let has_finish_updates = false;
        if (status.current == "TYPING"){
            //@ts-expect-error
            has_finish_updates = items_refs[innerTextIndex.current].current.forward();
        }else{
            //@ts-expect-error
            has_finish_updates = items_refs[innerTextIndex.current].current.backword();
        }

        if (has_finish_updates && status.current == "DELETING" && innerTextIndex.current == 0 ||
            has_finish_updates && status.current == "DELETING" && innerTextIndex.current == items_refs.length
           ){
            stopAudio();
            isUpdaterRunning.current = false;
            callback();
            return;
        }

        if (has_finish_updates && status.current == "DELETING"){
            innerTextIndex.current -= 1;
        }
        if (has_finish_updates && status.current == "TYPING"){
            innerTextIndex.current += 1;
        }

		setTimeout(textUpdateHandler, TYPING_PERIOD_MS);
    }

    function startTextUpdater(callback: () => void){
        if ( isUpdaterRunning.current ){
            return
        }
        startAudio();
        isUpdaterRunning.current = true
        textUpdateHandler(callback);
    }


	useImperativeHandle(ref, () => ({
		start: (callback: () => void) => {
            status.current = "TYPING";
            startTextUpdater(callback);
		},
		stop: (callback: () => void) => {
            status.current = "DELETING";
            startTextUpdater(callback);
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
