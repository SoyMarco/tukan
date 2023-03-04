import { useState, useEffect } from "react";
import LayoutHome from "./Components/Layout/LayoutHome";
import Home from "./Pages/Home";

function App() {
	const [showDescription, setShowDescription] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setShowDescription(false);
		}, 1000); // 1 second
		return () => {
			clearTimeout(timer);
		};
	}, []);
	return (
		<>
			{showDescription ? (
				<>
					<p>
						Bienvenido al sistema para visualizar tablas y graficas de la base
						de datos de Banxico.
					</p>
					<p> Sistema creado por Marco para Tukan.</p>
				</>
			) : (
				<LayoutHome>
					<Home />
				</LayoutHome>
			)}
		</>
	);
}

export default App;
