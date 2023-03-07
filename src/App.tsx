import { useState, useEffect } from "react";
import Description from "Components/Description/Description";
import LayoutHome from "./Components/Layout/LayoutHome";
import Home from "./Pages/Home";

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
					<Home />
				</LayoutHome>
			)}
		</>
	);
}

export default App;
