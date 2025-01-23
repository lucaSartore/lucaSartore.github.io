import PdaPage from "../../components/pda";
import { TypingParagraph } from "../../components/textbox";
import "../../components/pda/themes.css"
import { Route, Routes, useLocation, useNavigate } from "react-router";
import { isPageDoneWithSliding } from "../../components/pda";

export default function BluePillPage() {

    const navigate = useNavigate()

    
    const delay1 = window.getComputedStyle(document.body).getPropertyValue('--slide-delay').toString().replace("s","")
    const delay2 = window.getComputedStyle(document.body).getPropertyValue('--slide-duration').toString().replace("s","")
    const totalDelay = (parseFloat(delay1) + parseFloat(delay2)) * 1000;

    console.log(totalDelay)

    const paragraph = <TypingParagraph
        typingTime={1500}
        defaultStatus="TYPING"
        startTypingTimeout={isPageDoneWithSliding() ? 0 : totalDelay}
        items={[
            <br/>,
            <br/>,
            <a onClick={() => navigate("./foo")}>foo</a>,
            <a onClick={() => console.log("hello bar")}>bar</a>,
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


    return (
        <>
            <PdaPage
                navigationBarParams={{
                    // go back only if we are not already at the root page
                    backButtonCallback: useLocation().pathname == "/blue_pill"? () => {} : () => navigate(-1),
                    exitButtonCallback: () => navigate("/")
                }}
            >
                <Routes>
                    <Route path="/" element={paragraph} />
                    <Route path="/foo" element={<h1>foo</h1>} />
                    <Route path="/bar" element={<h1>bar</h1>} />
                </Routes>
            </PdaPage>
        </>
    )
}
