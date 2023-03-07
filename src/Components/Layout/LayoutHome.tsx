import { ReactNode } from "react";
import { Layout } from "antd";

function LayoutHome({ children }: { children: ReactNode }) {
	const { Header, Content } = Layout;

	return (
		<Layout>
			<Header
				className='header'
				style={{ background: "linear-gradient(to right,#515c79, #1d2b4e)" }}
			>
				<div className='logo' />
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
