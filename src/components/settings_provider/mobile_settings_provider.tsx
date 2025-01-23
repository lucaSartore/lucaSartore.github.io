import  { createContext, useState, useEffect, PropsWithChildren} from 'react';
import "./mobile-mode-settings.css"

export const MobileSettingsContext = createContext<{
    mobileMode: boolean,
    setMobileMode: (_: boolean) => void
}>({
    mobileMode: false,
    setMobileMode: _ => {}
});


export const MobileSettingsProvider = (props: PropsWithChildren) => {

  const [mobileMode, setTheme] = useState(() => {
    var savedMobileMode = localStorage.getItem('mobileMode');
    if (savedMobileMode != null){
        return savedMobileMode == "true"
    }
    return false
  });

  console.log("build mobile mode: ", mobileMode)

  document.documentElement.setAttribute('mobile-mode', mobileMode.toString());
  useEffect(() => {
    document.documentElement.setAttribute('mobile-mode', mobileMode.toString());
    localStorage.setItem('mobileMode', mobileMode.toString());
  }, [mobileMode]);


  const setMobileMode = (newMode: boolean) => {
    setTheme(newMode);
  };

  // text
  return (
    <MobileSettingsContext.Provider value={{ mobileMode, setMobileMode }}>
      {props.children}
    </MobileSettingsContext.Provider>
  );
};

export function isMobileMode(): boolean {
    return localStorage.getItem('mobileMode') == "true"
}
