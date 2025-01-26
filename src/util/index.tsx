import { isPageDoneWithSliding } from "../components/pda";

export function GetStartTypingTimeout() {
    const delay1 = window.getComputedStyle(document.body).getPropertyValue('--slide-delay').toString().replace("s","")
    const delay2 = window.getComputedStyle(document.body).getPropertyValue('--slide-duration').toString().replace("s","")
    const totalDelay = (parseFloat(delay1) + parseFloat(delay2)) * 1000;
    return isPageDoneWithSliding() ? 0 : totalDelay
}
