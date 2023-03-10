import { useMemo, ReactNode } from "react";
import ContextDashboard from "./ContextDashboard";
import useDashboard from "Hooks/useDashboard/useDashboard";
import useControllerStorage from "Components/Modal/Storage/useControllerStorage";

export default function StateDashboard({ children }: { children: ReactNode }) {
	const allUseDashboard = useDashboard();
	const allUseLocalStorash = useControllerStorage();

	const valuesHome = useMemo(
		() => ({ ...allUseDashboard, ...allUseLocalStorash }),
		[allUseDashboard, allUseLocalStorash]
	);
	return (
		<ContextDashboard.Provider value={valuesHome}>
			{children}
		</ContextDashboard.Provider>
	);
}
