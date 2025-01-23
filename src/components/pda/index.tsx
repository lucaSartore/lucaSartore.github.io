import pda_img from "../../assets/pda.png";
import desk_img from "../../assets/desk_3.jpg";
import "./index.css"
import "./themes.css"
import { forwardRef, ReactNode, useImperativeHandle, useRef, useState } from "react";
import { NavigationBar } from "./navigation_bar";
import { NavigationBarParams } from "./navigation_bar";

type PdaPageProps = {
    children: ReactNode
    navigationBarParams: NavigationBarParams
}

function PdaPage(props: PdaPageProps) {
    return (
        <>
            <div id="pda-page-main-div">
                <div id="pda-container">
                    <PdaWrapper navigationBarParams={props.navigationBarParams}>
                        {props.children}
                    </PdaWrapper>
                </div>
                <img src={desk_img} id="desk-img" />
            </div>
        </>
    )
}


const PdaWrapper = forwardRef((props: PdaPageProps, ref) => {
    const refPdaWrapper = useRef(null)
    
    const [fullScreen,setFullScreen] = useState<boolean>(false)

    useImperativeHandle(ref, () => ({
        toggleFullscreen: () => {
            console.log("full screen");
        }
    }));

    return (
        <>
            <div
                className="pda-main-div "
                ref={refPdaWrapper}
                {...props}
            >
                <img
                    src={pda_img}
                    className="pda-img"
                    alt="PDA"
                />
                <div className={fullScreen? "pda-screen-full-screen" : "pda-screen"} >
                </div>

                <div className={fullScreen? "pda-screen-top-full-screen" : "pda-screen-top"}>
                    <NavigationBar
                        backButtonCallback = {props.navigationBarParams.backButtonCallback}
                        fullScreenButtonCallback = {() => setFullScreen(true)}
                        exitFullScreenButtonCallback = {() => setFullScreen(false)}
                        exitButtonCallback = {props.navigationBarParams.exitButtonCallback}
                    />
                    {props.children}
                </div>
            </div>
        </>
    );
})

export function isPageDoneWithSliding() : boolean{
    const element = document.getElementById("pda-container");
    if (element == null){
        return false;
    }
    return element.getBoundingClientRect().y == 0;
}

export default PdaPage;
