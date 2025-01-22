import pda_img from "../../assets/pda.png";
import desk_img from "../../assets/desk_3.jpg";
import "./index.css"
import "./themes.css"
import { forwardRef, PropsWithChildren, ReactNode, useImperativeHandle, useRef } from "react";
import { ThemeProvider } from "./theme_provider";
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

    useImperativeHandle(ref, () => ({
        toggleFullscreen: () => {
            console.log("full screen");
        }
    }));

    return (
        <>
            <div
                className="pda-main-div"
                ref={refPdaWrapper}
                {...props}
            >
                <img
                    src={pda_img}
                    className="pda-img"
                    alt="PDA"
                />
                <div className="pda-screen themed-component" >
                </div>

                <div className="pda-screen-top themed-component">
                    <ThemeProvider>
                        <NavigationBar
                            backButtonCallback = {props.navigationBarParams.backButtonCallback}
                            fullScreenButtonCallback = {props.navigationBarParams.fullScreenButtonCallback}
                            exitFullScreenButtonCallback = {props.navigationBarParams.exitFullScreenButtonCallback}
                            exitButtonCallback = {props.navigationBarParams.exitButtonCallback}
                        />
                        {props.children}
                    </ThemeProvider>
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
