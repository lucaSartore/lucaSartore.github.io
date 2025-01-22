import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import BluePillPage from "./info_pages/blue_pill_page";

import "./index.css";

import MorpheusPage from "./morpheus_page";
import PdaPage from "./components/pda";

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

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Navigate to="/pick_one" replace />} />
				<Route path="/pick_one" element={<MorpheusPage />} />
				<Route path="/blue_pill" element={<BluePillPage />} />
				<Route path="/red_pill" element={<MorpheusPage />} />
				<Route path="*" element={<h1>404 page </h1>} />
			</Routes>
		</BrowserRouter>
	</React.StrictMode>,
);
