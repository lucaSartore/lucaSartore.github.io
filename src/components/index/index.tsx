import PdaPage from "../pda";
import { TypingParagraph, TypingTextProps } from "../textbox";
import "../pda/themes.css"
import { Route, Routes, useLocation, useNavigate } from "react-router";
import { GetStartTypingTimeout } from "../../util";


export type IndexPageArgs = {
    title: string,
    subPages: Array<{ title: string, description: string, linkPage: JSX.Element, linkPageUrl: string }>
}


export default function IndexPage(params: IndexPageArgs) {
    const navigate = useNavigate()

    var itemsList: Array<TypingTextProps | JSX.Element> = [];

    itemsList.push({
        text: params.title,
        className: "font-size-medium custom-font title-color"
    });

    for (var sp of params.subPages){
        itemsList.push({
            text: sp.title,
            constructorFunc: (x: string) => {
                return <a onClick={() => navigate(`./${sp.linkPageUrl}`)} >{x}</a>
            }
        });
        itemsList.push({
            text: sp.description,
            className: "font-size-medium custom-font title-color"
        });

    }

    const paragraph = <TypingParagraph
        typingTime={1500}
        defaultStatus="TYPING"
        startTypingTimeout={GetStartTypingTimeout()}
        items={itemsList}
    />


    const subPages = params.subPages.map(x => {
        return <Route path={"/" + x.linkPageUrl} element={x.linkPage}/>
    })

    return (
        <>
            <PdaPage
                navigationBarParams={{
                    // go back only if we are not already at the root page
                    backButtonCallback: useLocation().pathname == "/blue_pill" ? () => { } : () => navigate(-1),
                    exitButtonCallback: () => navigate("/")
                }}
            >
                <Routes>
                    <Route path="/" element={paragraph} />
                    {subPages}
                </Routes>
            </PdaPage>
        </>
    )
}
