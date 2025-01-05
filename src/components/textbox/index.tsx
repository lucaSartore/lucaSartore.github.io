import React, {
	useState,
	useRef,
	useImperativeHandle,
	forwardRef,
} from "react";

const TYPING_PERIOD_MS = 5;
const TYPING_VOLUME = 0.2;


export type TypingTextProps = {
    text: string | undefined;
    className: string | undefined;
}

export type TypingTextRef = {
    start: (callback: () => void) => void;
    stop: (callback: () => void) => void;
}

const TypingText = forwardRef((props: TypingTextProps, ref: React.ForwardedRef<TypingTextRef>) => {

    const text = props.text || "default TypingText text";
    const className = props.className || "";

	const [displayedText, setDisplayedText] = useState("");
	const audioRef: React.MutableRefObject<HTMLAudioElement | null> = useRef(null);



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


    const textLength = useRef(0);
	const isUpdaterRunning = useRef(false);
	const status = useRef<"TYPING" | "DELETING">("DELETING"); 

     
    function textUpdateHandler(callback: () => void){
        if (
            status.current == "TYPING" && textLength.current == text.length ||
            status.current == "DELETING" && textLength.current == 0
        ){
            stopAudio();
            isUpdaterRunning.current = false;
            callback();
            return;
        }

        if (status.current == "TYPING"){
            const nextLetter = text[textLength.current]
			setDisplayedText((prev) => prev + nextLetter);
            textLength.current += 1;
        }else{
			setDisplayedText((prev) => prev.slice(0, -1));
            textLength.current -= 1;
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
			{displayedText}
			<audio
				ref={audioRef}
				preload="auto"
				src="./src/assets/keyboard_sound.mp3"
				className="hidden"
				loop={true}
			/>
		</div>
	);
});

export default TypingText ;
