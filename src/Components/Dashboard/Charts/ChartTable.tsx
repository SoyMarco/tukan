import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { ChartType, DataChart } from "Types/Dashboard";

function ChartTable({ data, settings }: ChartType) {
	const columns: ColumnsType<DataChart> = [
		{
			title: "Fecha",
			dataIndex: "fecha",
			key: "fecha",
		},
		{
			title: "dato",
			dataIndex: "datoN",
			key: "datoN",
		},
	];

	return (
		<Table
			columns={columns}
			dataSource={data}
			bordered
			size='small'
			scroll={{ y: "200px" }}
		/>
	);
}

export default ChartTable;
