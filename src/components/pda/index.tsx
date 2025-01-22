import pda_img from "../../assets/pda.png";
import desk_img from "../../assets/desk_3.jpg";
import "./index.css"
import "./themes.css"
import { forwardRef, PropsWithChildren, useImperativeHandle, useRef } from "react";
import { ThemeProvider } from "./theme_provider";
import { NavigationBar } from "./navigation_bar";

function PdaPage(props: PropsWithChildren) {
    return (
        <>
            <div id="pda-page-main-div">
                <div id="pda-container">
                    <PdaWrapper >
                        {props.children}
                    </PdaWrapper>
                </div>
                <img src={desk_img} id="desk-img" />
            </div>
        </>
    )
}


const PdaWrapper = forwardRef((props: PropsWithChildren, ref) => {
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
                    <NavigationBar/>
                    <ThemeProvider>
                        {props.children}
                    </ThemeProvider>
                </div>
            </div>
        </>
    );
})

export default PdaPage;
