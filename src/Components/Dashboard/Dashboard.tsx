import { useContext, useMemo } from "react";
import ContextDashboard from "Context/Dashboard/ContextDashboard";
import ChartCard from "./ChartCard/ChartCard";
import { Grid } from "antd";
import {
	GridContextProvider,
	GridDropZone,
	GridItem,
	swap,
} from "react-grid-dnd";

function Dashboard() {
	const { dataDashboards, createDashboard } = useContext(ContextDashboard);
	const { useBreakpoint } = Grid;
	const screens = useBreakpoint();

	const onChange = (
		sourceId: string,
		sourceIndex: number,
		targetIndex: number
	) => {
		const nextState = swap(dataDashboards, sourceIndex, targetIndex);
		createDashboard(nextState);
	};
	const breakpoints = useMemo(() => {
		if (dataDashboards.length === 1) return 1;
		if (screens.xs || (screens.sm && !screens.md)) return 1;
		if (dataDashboards.length === 2) return 2;
		if (screens.md && !screens.lg) return 2;
		if (dataDashboards.length === 3) return 3;
		return 3;
	}, [dataDashboards.length, screens]);

	return (
		<div style={{ marginTop: 15 }} id='completeDashboard'>
			<GridContextProvider onChange={onChange}>
				<GridDropZone
					id='first'
					boxesPerRow={breakpoints}
					rowHeight={450}
					style={{
						height: 450 * Math.ceil(dataDashboards.length / breakpoints),
					}}
				>
					{dataDashboards.map((chart) => (
						<GridItem key={chart.settings.id}>
							<ChartCard chart={chart} />
						</GridItem>
					))}
				</GridDropZone>
			</GridContextProvider>
		</div>
	);
}

export default Dashboard;
