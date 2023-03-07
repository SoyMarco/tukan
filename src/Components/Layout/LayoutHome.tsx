import { ReactNode } from "react";
import { Layout } from "antd";
import tukanPNG from "Assets/tukan.png";

function LayoutHome({ children }: { children: ReactNode }) {
	const { Header, Content } = Layout;

	return (
		<Layout>
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
			<Layout style={{ padding: "15px" }}>
				<Content
					style={{
						padding: 10,
						margin: 5,
						background: "white",
					}}
				>
					{children}
				</Content>
			</Layout>
		</Layout>
	);
}

export default LayoutHome;
