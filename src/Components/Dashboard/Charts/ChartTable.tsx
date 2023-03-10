import { ChartType, DataChart } from "Types/Dashboard";
import { ColumnsType } from "antd/es/table";
import { Table } from "antd";

function ChartTable({ data }: ChartType) {
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
			rowKey={({ fecha, datoN }) => `${fecha}${datoN}`}
			scroll={{ y: "200px" }}
			columns={columns}
			dataSource={data}
			size='small'
			bordered
		/>
	);
}

export default ChartTable;
