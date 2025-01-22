import "./navigation_bar.css"
import Icon from '@mdi/react';
import { mdiFullscreen, mdiFullscreenExit, mdiCloseOctagonOutline, mdiArrowLeftCircleOutline, mdiCog} from '@mdi/js';
import { useLocation } from 'react-router';
import "../../fonts.css"
import { useState } from "react";

export type NavigationBarParams = {
    backButtonCallback?: () => void
    fullScreenButtonCallback?: () => void
    exitFullScreenButtonCallback?: () => void
    exitButtonCallback?: () => void
}

export function NavigationBar(params: NavigationBarParams){
    const location = useLocation();
    const pathName = location.pathname.slice(1).replace("/", " > ");

    const backButtonCallback = params.backButtonCallback || (() => {});
    const fullScreenButtonCallback = params.fullScreenButtonCallback  || (() => {});
    const exitFullScreenButtonCallback = params.exitFullScreenButtonCallback  || (() => {});
    const exitButtonCallback = params.exitButtonCallback || (() => {});

    const [fullScreen,setFullScreen] = useState<boolean>(false)
    return (
        <>
            <div className="navigation-bar">
                <h1 className="url-value custom-font"> {pathName} </h1>
                <div 
                    className="hide-icon-div"
                    onClick={backButtonCallback}
                    style={{marginLeft: "auto"}}
                    >
                    <Icon path={mdiArrowLeftCircleOutline}   className="icon" />
                </div>
                <div 
                    className="hide-icon-div"
                    onClick={() => {}}
                    >
                    <Icon path={mdiCog}  className="icon"  />
                </div>
                <div 
                    className="hide-icon-div"
                    style={{width: fullScreen? 0: "auto"}}
                    onClick={() => {setFullScreen(true); fullScreenButtonCallback()}}
                    >
                    <Icon path={mdiFullscreen} className="icon" />
                </div>
                <div 
                    className="hide-icon-div"
                    style={{width: fullScreen? "auto": 0}}
                    onClick={() => {setFullScreen(false); exitFullScreenButtonCallback()}}
                    >
                    <Icon path={mdiFullscreenExit}  className="icon" />
                </div>
                <div 
                    className="hide-icon-div"
                    onClick={exitButtonCallback}
                    style={{marginRight: "1%"}}
                    >
                    <Icon path={mdiCloseOctagonOutline}   className="icon" />
                </div>
            </div>
        </>
    )
}
