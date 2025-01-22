import "./navigation_bar.css"

import Icon from '@mdi/react';
import { mdiFullscreen, mdiCloseOctagonOutline, mdiArrowLeftCircleOutline} from '@mdi/js';


export function NavigationBar(){
    return (
        <>
            <div className="navigation-bar">
                <Icon path={mdiArrowLeftCircleOutline} style={{marginLeft: "auto"}}  className="icon" />
                <Icon path={mdiFullscreen}  className="icon" />
                <Icon path={mdiCloseOctagonOutline}  style={{marginRight: "1%"}} className="icon" />
            </div>
        </>
    )
}
