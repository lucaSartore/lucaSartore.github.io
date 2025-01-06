import image from "../assets/morpheus.jpg";
import blue_pill_border from "../assets/blue_pill_border.png";
import red_pill_border from "../assets/red_pill_border.png";
import "./index.css";
import "../fonts.css";
import { TypingParagraph, TypingParagraphRef } from "../components/textbox";
import { useRef } from "react";
import AnimatedEllipsis from "./animated_text";
import {  useNavigate } from "react-router";


function MorpheusPage() {
	const refRedText = useRef<TypingParagraphRef>(null);
	const refBlueText = useRef<TypingParagraphRef>(null);
    const navigate = useNavigate()

	return (
		<>
			<div id="main_div">
                <div id = "pick_one_text" className="font-size-huge custom-font">
                    <AnimatedEllipsis />
                </div>
				<div id="img_div">
					<div
						id="red_pill_div"
						onMouseEnter={() => refRedText.current?.start()}
						onMouseLeave={() => refRedText.current?.stop()}
                        onClick={() => navigate("/red_pill")}
					></div>
					<div
						id="blue_pill_div"
						onMouseEnter={() => refBlueText.current?.start()}
						onMouseLeave={() => refBlueText.current?.stop()}
                        onClick={() => navigate("/blue_pill")}
					></div>
					<img className="image" src={image} />
					<img className="image" id="blue_pill_border" src={blue_pill_border} />
					<img className="image" id="red_pill_border" src={red_pill_border} />
					<TypingParagraph
						ref={refRedText}
						className="red_pill_text_box"
                        typingTime={1500}
						items={[
							{
								className: "font-size-medium custom-font",
								text: "Let’s have some fun!",
							},
							{
								className: "font-size-small custom-font",
								text: `Explore my personal “Website-Game”...`,
							},
							{
								className: "font-size-small custom-font",
								text: `You have been tasked with retrieving some extremely important data, to recover them you will need to explore an abandoned city full of killer robots. `,
							},
							{
								className: "font-size-small custom-font",
								text: `Remember that if you change your mind you can always refresh the website and choose the blue pill.`, },
						]}
					/>

					<TypingParagraph
						ref={refBlueText}
						className="blue_pill_text_box"
                        typingTime={1000}
						items={[
							{
								className: "font-size-medium custom-font",
								text: "Go straight to the point!",
							},
							{
								className: "font-size-small custom-font",
								text: `You don’t have time to waste don’t you? I see, in this case you can choose the blue pill, and you will be able to immediately get what you are looking for.`,
							},
							{
								className: "font-size-small custom-font",
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
