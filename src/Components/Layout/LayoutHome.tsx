import React, { useState, ReactNode } from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import type { MenuProps } from "antd";
import {
	LaptopOutlined,
	NotificationOutlined,
	UserOutlined,
} from "@ant-design/icons";

function LayoutHome({ children }: { children: ReactNode }) {
	const { Header, Content, Sider } = Layout;
	const [collapsed, setCollapsed] = useState<boolean>(false);

	const items1: MenuProps["items"] = ["1", "2", "3"].map((key) => ({
		key,
		label: `nav ${key}`,
	}));

	const items2: MenuProps["items"] = [
		UserOutlined,
		LaptopOutlined,
		NotificationOutlined,
	].map((icon, index) => {
		const key = String(index + 1);

		return {
			key: `sub${key}`,
			icon: React.createElement(icon),
			label: `subnav ${key}`,

			children: new Array(4).fill(null).map((_, j) => {
				const subKey = index * 4 + j + 1;
				return {
					key: subKey,
					label: `option${subKey}`,
				};
			}),
		};
	});

	return (
		<Layout>
			<Header
				className='header'
				style={{ background: "linear-gradient(to right,#515c79, #1d2b4e)" }}
			>
				<div className='logo' />
			</Header>
			<Layout>
				<Sider
					collapsible
					collapsed={collapsed}
					onCollapse={(value) => setCollapsed(value)}
					width={175}
					style={{ background: "#e6e6e6" }}
				>
					<Menu
						mode='inline'
						defaultSelectedKeys={["1"]}
						defaultOpenKeys={["sub1"]}
						style={{ height: "100%", borderRight: 0, background: "#e6e6e6" }}
						items={items2}
					/>
				</Sider>
				<Layout style={{ padding: "0 24px 24px" }}>
					<Breadcrumb style={{ margin: "16px 0" }}>
						<Breadcrumb.Item>Home</Breadcrumb.Item>
						<Breadcrumb.Item>List</Breadcrumb.Item>
						<Breadcrumb.Item>App</Breadcrumb.Item>
					</Breadcrumb>
					<Content
						style={{
							padding: 10,
							margin: 0,
							minHeight: 280,
							background: "white",
						}}
					>
						{children}
					</Content>
				</Layout>
			</Layout>
		</Layout>
	);
}

export default LayoutHome;
