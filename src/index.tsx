import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import StateDashboard from "Context/Dashboard/StateDashboard";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	// <React.StrictMode>
	<StateDashboard>
		<App />
	</StateDashboard>
	//  </React.StrictMode>
);

reportWebVitals();
