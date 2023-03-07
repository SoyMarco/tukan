import useDashboard from "./useDashboard";
import { renderHook, act } from "@testing-library/react-hooks";
import { dataChart, dataChartArray } from "Mocks";
import { ActionModalEnum } from "Types/Dashboard";

describe("useDashboard", () => {
	it("should create chart", () => {
		const { result } = renderHook(() => useDashboard());
		act(() => {
			result.current.createChart(dataChart);
		});
		expect(result.current.dataDashboards.length).toEqual(1);
	});

	it("should read chart", () => {
		const { result } = renderHook(() => useDashboard());
		act(() => {
			result.current.createDashboard(dataChartArray);
			result.current.readChart(dataChart);
		});

		expect(result.current.settingsModal).toEqual({
			...dataChart.settings,
			action: ActionModalEnum.UPDATE,
		});
	});

	it("should update chart", () => {
		const { result } = renderHook(() => useDashboard());
		act(() => {
			result.current.createDashboard(dataChartArray);
		});
		act(() => {
			result.current.updateChart(dataChart);
		});
		expect(result.current.dataDashboards[0]).toEqual(dataChart);
	});

	it("should delete chart", () => {
		const { result } = renderHook(() => useDashboard());
		act(() => {
			result.current.createDashboard(dataChartArray);
		});
		act(() => {
			result.current.deleteChart("1678162564665");
		});
		expect(result.current.dataDashboards.length).toEqual(2);
		expect(result.current.dataDashboards[0]).toEqual(dataChartArray[1]);
	});

	it("should create dashboard", () => {
		const { result } = renderHook(() => useDashboard());
		act(() => {
			result.current.createDashboard(dataChartArray);
		});
		expect(result.current.dataDashboards.length).toEqual(3);
		expect(result.current.dataDashboards).toEqual(dataChartArray);
	});
});
