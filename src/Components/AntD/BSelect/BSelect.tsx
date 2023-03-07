import { Select } from "antd";
import { BSelectProps } from "Types/Dashboard";

function BSelect<T = string>(props: BSelectProps<T>) {
	const { placeholder, options, onChange, value, loading } = props;
	return (
		<Select
			filterOption={(input, option) =>
				(option?.label.toLowerCase() ?? "").includes(input.toLowerCase())
			}
			filterSort={(optionA, optionB) =>
				(optionA?.label ?? "")
					.toLowerCase()
					.localeCompare((optionB?.label ?? "").toLowerCase())
			}
			style={{ width: "100%" }}
			status={value ? undefined : "error"}
			optionFilterProp='children'
			placeholder={placeholder}
			onChange={onChange}
			loading={loading}
			options={options}
			value={value}
			showSearch
		/>
	);
}

export default BSelect;
