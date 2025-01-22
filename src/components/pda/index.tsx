import pda_img from "../../assets/pda.png";
import desk_img from "../../assets/desk_3.jpg";
import "./index.css"
import "./themes.css"
import { forwardRef, PropsWithChildren, useImperativeHandle, useRef } from "react";
import { ThemeProvider } from "./theme_provider";

function PdaPage() {
    return (
        <>
            <div id="pda-page-main-div">
                <div id="pda-container">
                    <PdaWrapper >
                        <h1> hello </h1>
                        <a> this is some cool text inside my pda </a>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        <h1> hello </h1>
                        
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
                    <ThemeProvider>
                        {props.children}
                    </ThemeProvider>
                </div>
            </div>
        </>
    );
})

export default PdaPage;
