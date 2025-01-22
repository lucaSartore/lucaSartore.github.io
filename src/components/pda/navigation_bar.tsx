import "./navigation_bar.css"
import Icon from '@mdi/react';
import { mdiFullscreen, mdiCloseOctagonOutline, mdiArrowLeftCircleOutline, mdiCog} from '@mdi/js';
import { useLocation } from 'react-router';
import "../../fonts.css"


export function NavigationBar(){
    const location = useLocation();
    const pathName = location.pathname.slice(1).replace("/", " > ") + "foo> foo> foo> foo> ";

    return (
        <>
            <div className="navigation-bar">
                <h1 className="url-value custom-font"> {pathName} </h1>
                <Icon path={mdiArrowLeftCircleOutline} style={{marginLeft: "auto"}}  className="icon" />
                <Icon path={mdiCog}  className="icon" />
                <Icon path={mdiFullscreen}  className="icon" />
                <Icon path={mdiCloseOctagonOutline}  style={{marginRight: "1%"}} className="icon" />
            </div>
        </>
    )
}
