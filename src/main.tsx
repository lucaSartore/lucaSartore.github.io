import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import BluePillPage from "./info_pages/blue_pill_page";

import "./index.css";

import MorpheusPage from "./morpheus_page";
import MobileWarningPage from "./mobile_warning_page";
import { isMobileMode } from "./components/settings_provider/mobile_settings_provider";
import { SettingsProvider } from "./components/settings_provider";

// just a trick to make single page app work in github-pages
// credit: https://github.com/rafgraph/spa-github-pages
(function (l) {
	if (l.search[1] === "/") {
		var decoded = l.search
			.slice(1)
			.split("&")
			.map(function (s) {
				return s.replace(/~and~/g, "&");
			})
			.join("?");
		window.history.replaceState(
			null,
			//@ts-ignore
			null,
			l.pathname.slice(0, -1) + decoded + l.hash,
		);
	}
})(window.location);


const isMobileUser = (
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i)  ||
    navigator.userAgent.match(/Android/i)
);

const defaultRoute = isMobileMode()? "/blue_pill" : isMobileUser? "/mobile_warning" : "/pick_one";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
        <SettingsProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate to={defaultRoute} replace />} />
                    <Route path="/pick_one" element={<MorpheusPage />} />
                    <Route path="/blue_pill/*" element={<BluePillPage />} />
                    <Route path="/red_pill/*" element={<MorpheusPage />} />
                    <Route path="/mobile_warning" element={<MobileWarningPage />} />
                    <Route path="*" element={<h1>404 page </h1>} />
                </Routes>
            </BrowserRouter>
        </SettingsProvider>
	</React.StrictMode>,
);
