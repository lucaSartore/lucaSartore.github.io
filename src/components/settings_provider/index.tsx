import  {  PropsWithChildren} from 'react';
import { MobileSettingsProvider } from './mobile_settings_provider';
import { ThemeProvider } from './theme_provider';

export const SettingsProvider = (props: PropsWithChildren) => {
    return <ThemeProvider>
        <MobileSettingsProvider>
            {props.children}
        </MobileSettingsProvider>
    </ThemeProvider>
}
