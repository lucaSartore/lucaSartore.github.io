import { TypingParagraph, TypingTextProps } from "../textbox";
import "../pda/themes.css"
import { Route, Routes, useNavigate } from "react-router";
import { GetStartTypingTimeout } from "../../util";
import "./index.css"


export type IndexPageArgs = {
    title: string,
    subPages: Array<{ title: string, description: string, linkPage: JSX.Element, linkPageUrl: string, emoji?: string}>
}


export default function IndexPage(params: IndexPageArgs) {

    const navigate = useNavigate()
    var itemsList: Array<TypingTextProps | JSX.Element> = [];

    itemsList.push({
        text:  params.title,
        className: "font-size-huge custom-font title-color index-title"
    });

    itemsList.push(
        <hr className="index-separator"/>
    )

    for (var sp of params.subPages){
        const text = sp.title;
        const emoji = sp.emoji;
        const linkPage = sp.linkPageUrl;
        itemsList.push({
            text: text,
            constructorFunc: (x: string) => {
                return <div
                    className= "font-size-medium custom-font subtitle-color url-class index-item"
                >
                    {x.length != 0? "> " : ""}
                    <a
                        onClick={() => navigate(`./${linkPage}`)}
                        className= "font-size-medium custom-font subtitle-color url-class underlined"
                    >{x}</a>
                    {x.length == text.length? emoji : ""}
                </div>
            }
        });
        itemsList.push({
            text: sp.description,
            className: "font-size-small custom-font text-color index-description"
        });

    }

    itemsList.push(<br/>)

    const paragraph = <TypingParagraph
        typingTime={1500}
        defaultStatus="TYPING"
        startTypingTimeout={GetStartTypingTimeout()}
        items={itemsList}
    />


    const subPages = params.subPages.map(x => {
        return <Route path={"/" + x.linkPageUrl + "/*"} element={x.linkPage}/>
    })

    return (
        <>
            <Routes>
                <Route path="/" element={paragraph} />
                {subPages}
            </Routes>
        </>
    )
}
