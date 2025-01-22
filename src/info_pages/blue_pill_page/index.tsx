import PdaPage from "../../components/pda";
import { TypingParagraph } from "../../components/textbox";
import "../../components/pda/themes.css"


export default function BluePillPage() {

    return (
        <>
            <PdaPage>
					<TypingParagraph
                        typingTime={1500}
                        defaultStatus="TYPING"
                        startTypingTimeout={1000}
						items={[
                            <br/>,
                            <br/>,
                            <br/>,
                            <hr/>,
							{
								className: "font-size-medium custom-font title-color",
								text: "Let’s have some fun!",
							},
							{
								className: "font-size-small custom-font",
								text: `Explore my personal “Website-Game”...`,
							},
                            <hr/>,
							{
								className: "font-size-small custom-font",
								text: `You have been tasked with retrieving some extremely important data, to recover them you will need to explore an abandoned city full of killer robots. `,
							},
							{
								className: "font-size-small custom-font",
								text: `Remember that if you change your mind you can always refresh the website and choose the blue pill.`, },
						]}
					/>
                
            </PdaPage>
        </>
    )


}
