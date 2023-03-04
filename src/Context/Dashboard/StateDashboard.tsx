import { useMemo, ReactNode } from "react";
import ContextDashboard from "./ContextDashboard";
import useDashboard from "Hooks/useDashboard";
import useLocalStorash from "Hooks/useLocalStorash";

export default function StateDashboard({ children }: { children: ReactNode }) {
	const allUseDashboard = useDashboard();
	const allUseLocalStorash = useLocalStorash();

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
