import { Layout } from "antd";
import tukanPNG from "Assets/tukan.png";

function BHeader() {
	const { Header } = Layout;

	return (
		<Header
			className='header'
			style={{ background: "linear-gradient(to right,#515c79, #1d2b4e)" }}
		>
			<img
				src={tukanPNG}
				alt='Tukan'
				style={{
					width: 130,
					color: "white",
					filter: "grayscale(1) contrast(0.5) brightness(3.5)",
				}}
			/>
		</Header>
	);
}

export default BHeader;
