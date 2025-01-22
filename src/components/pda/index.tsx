import pda_img from "../../assets/pda.png";
import desk_img from "../../assets/desk_3.jpg";
import React, { useEffect, useState, useRef } from "react";
import "./index.css"


function PdaPage(){
    return (
		<>
            <div id="pda-page-main-div">
                <div id="pda-container">
                    <PdaWrapper/>               
                </div>
                <img src={desk_img} id="desk-img"/>
            </div>
		</>
    )
}

function PdaWrapper() {
    const [overlayStyle, setOverlayStyle] = useState({});
    const imageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const updateOverlay = () => {
            const image = imageRef.current;
            if (!image) return;

            const imageRect = image.getBoundingClientRect();
            const imageWidth = imageRect.width;
            const imageHeight = imageRect.height;

            const topLeftX = imageWidth * 0.264;
            const topLeftY = imageHeight * 0.115;
            const bottomRightX = imageWidth * 0.975;
            const bottomRightY = imageHeight * 0.963;

            const overlayWidth = bottomRightX - topLeftX;
            const overlayHeight = bottomRightY - topLeftY;

            setOverlayStyle({
                width: `${overlayWidth}px`,
                height: `${overlayHeight}px`,
                left: `${imageRect.left + topLeftX}px`,
                top: `${imageRect.top + topLeftY}px`,
            });
        };

        updateOverlay();
        window.addEventListener("resize", updateOverlay);

        return () => window.removeEventListener("resize", updateOverlay);
    }, []);

    return (
        <>
            <img
                ref={imageRef}
                src={pda_img}
                className="pda-class"
                alt="PDA"
            />
            <div className="pda-screen" style={overlayStyle}></div>
        </>
    );
}

export default PdaPage;
