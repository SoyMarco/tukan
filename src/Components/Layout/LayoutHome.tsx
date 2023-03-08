import { ReactNode } from "react";
import { Layout } from "antd";
import BHeader from "Components/BHeader/BHeader";

function LayoutHome({ children }: { children: ReactNode }) {
	const { Content } = Layout;

	return (
		<Layout>
			<BHeader />
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
