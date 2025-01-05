import image from "../assets/morpheus.jpg";
import blue_pill_border from "../assets/blue_pill_border.png";
import red_pill_border from "../assets/red_pill_border.png";
import "./index.css";
import {TypingParagraph, TypingParagraphRef} from "../components/textbox";
import { useRef } from "react";

function MorpheusPage() {

	const ref = useRef<TypingParagraphRef>(null);

	return (
		<>
			<div id="main_div">
				<div id="img_div">
					<div
						id="red_pill_div"
						onMouseEnter={() => ref.current?.start(() => {})}
						onMouseLeave={() => ref.current?.stop(() => {})}
					></div>
					<div id="blue_pill_div"></div>
					<img className="image" src={image} />
					<img className="image" id="blue_pill_border" src={blue_pill_border} />
					<img className="image" id="red_pill_border" src={red_pill_border} />
					<TypingParagraph ref={ref} className="red_pill_text_box" items={[
                        {
                            className: "",
                            text: "title\n"
                        },
                        {
                            className: "",
                            text: "text text text"
                        }
                    ]} />
				</div>
			</div>
		</>
	);
}

export default MorpheusPage;
