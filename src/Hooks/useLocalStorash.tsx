import { useContext, useEffect, useState } from "react";
import ContextDashboard from "Context/Dashboard/ContextDashboard";
import { ChartType } from "Types/Dashboard";

function useLocalStorash() {
	const { dataDashboards, createDashboard } = useContext(ContextDashboard);

	const [isOpenModal, setIsOpenModal] = useState(false);

	useEffect(() => {
		window.addEventListener("beforeunload", beforeUnload);
		const dataStorage = readLocalStorage();
		createDashboard(dataStorage);
		localStorage.removeItem("openModal");
		return () => {
			window.addEventListener("beforeunload", beforeUnload);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	//CREATE
	useEffect(() => {
		const existCharts = dataDashboards.length > 0;
		console.log("existCharts", existCharts, dataDashboards);
		if (existCharts) updateLocalStorage();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dataDashboards]);

	//READ
	const readLocalStorage = (): ChartType[] => {
		const myArrayJSON = localStorage.getItem("myArray");
		if (!myArrayJSON) return [];
		const myArrayObj: ChartType[] = myArrayJSON
			? JSON.parse(myArrayJSON)
			: null;

		return myArrayObj;
	};

	//UPDATE
	const updateLocalStorage = () => {
		console.log("updateLocalStorage", dataDashboards);
		localStorage.setItem("myArray", JSON.stringify(dataDashboards));
	};

	//DELETE
	const deleteLocalStorage = () => {
		localStorage.removeItem("myArray");
	};

	///////////////////////

	const beforeUnload = (event: BeforeUnloadEvent) => {
		const existCharts = readLocalStorage().length > 0;
		const showModalStorage = localStorage.getItem("openModal");
		console.log("beforeUnload", existCharts, showModalStorage);

		if (!existCharts || showModalStorage) return;
		event.preventDefault();
		event.returnValue = "";
		setIsOpenModal(true);
	};

	const deleteStoragereloadWindow = () => {
		deleteLocalStorage();
		window.location.reload();
	};

	const handleAcceptSaveStorage = () => {
		localStorage.setItem("openModal", "false");
		setIsOpenModal(false);
		window.location.reload();
	};
	return {
		setIsOpenModal,
		isOpenModal,
		deleteStoragereloadWindow,
		handleAcceptSaveStorage,
	};
}

export default useLocalStorash;
