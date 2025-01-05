import image from "../assets/morpheus.jpg";
import blue_pill_border from "../assets/blue_pill_border.png";
import red_pill_border from "../assets/red_pill_border.png";
import "./index.css";
import { TypingParagraph, TypingParagraphRef } from "../components/textbox";
import { useRef } from "react";

function MorpheusPage() {
	const refRedText = useRef<TypingParagraphRef>(null);
	const refBlueText = useRef<TypingParagraphRef>(null);

	return (
		<>
			<div id="main_div">
				<div id="img_div">
					<div
						id="red_pill_div"
						onMouseEnter={() => refRedText.current?.start()}
						onMouseLeave={() => refRedText.current?.stop()}
					></div>
					<div
						id="blue_pill_div"
						onMouseEnter={() => refBlueText.current?.start()}
						onMouseLeave={() => refBlueText.current?.stop()}
					></div>
					<img className="image" src={image} />
					<img className="image" id="blue_pill_border" src={blue_pill_border} />
					<img className="image" id="red_pill_border" src={red_pill_border} />
					<TypingParagraph
						ref={refRedText}
						className="red_pill_text_box"
                        typingTime={1000}
						items={[
							{
								className: "",
								text: "Let’s have some fun!",
							},
							{
								className: "",
								text: `Explore my personal “Website-Game”... In order to get any information about me you will have to fight!`,
							},
							{
								className: "",
								text: `Explore an abandoned city and try to survive while hunted by a group of killer robots. If you manage to defeat them, and reach an “Information point” you will be rewarded with the ultimate treasure! (aka my contact info, my cv, my portfolio etcetera).`,
							},
							{
								className: "",
								text: `Remember that if you change your mind you can always refresh the website and choose the blue pill.`, },
						]}
					/>

					<TypingParagraph
						ref={refBlueText}
						className="blue_pill_text_box"
                        typingTime={1000}
						items={[
							{
								className: "",
								text: "Go straight to the point!",
							},
							{
								className: "",
								text: `You don’t have time to waste don’t you? I see, in this case you can choose the blue pill, and you will be able to immediately get what you are looking for.`,
							},
							{
								className: "",
								text: `Remember that if you change your mind you can always refresh the website and choose the red pill.`,
							},
						]}
					/>
				</div>
			</div>
		</>
	);
}

export default MorpheusPage;
