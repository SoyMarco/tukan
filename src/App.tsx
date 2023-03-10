import { useState, useEffect } from "react";
import Description from "Pages/Description/Description";
import LayoutHome from "./Components/Layout/LayoutHome";
import Dashboard from "./Pages/Dashboard/Dashboard";
import StateDashboard from "Context/Dashboard/StateDashboard";

function App() {
	const [showDescription, setShowDescription] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setShowDescription(false);
		}, 1600);
		return () => {
			clearTimeout(timer);
		};
	}, []);

	return (
		<>
			{showDescription ? (
				<Description />
			) : (
				<LayoutHome>
					<StateDashboard>
						<Dashboard />
					</StateDashboard>
				</LayoutHome>
			)}
		</>
	);
}

export default App;
