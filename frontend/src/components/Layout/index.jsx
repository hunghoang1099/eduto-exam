import { Dropdown, Layout, Spin, theme } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../app/slices/userSlice";

const { Header, Content } = Layout;

const LayoutPage = ({ children }) => {
	const { isLoading } = useSelector((state) => state.loading);
	const navigate = useNavigate();
	const {
		token: { colorBgContainer },
	} = theme.useToken();
	const { isLogin, userInfo } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const userItems = [
		{
			key: 1,
			label: <p onClick={() => navigate("/profile")}>Profile</p>,
		},
		{
			key: 2,
			label: <p onClick={() => dispatch(logout())}>Logout</p>,
		},
	];

	useEffect(() => {
		if (!isLogin) {
			navigate("/login");
		}
	}, [isLogin, navigate]);

	if (isLogin)
		return (
			<Spin spinning={isLoading}>
				<Layout className="h-screen">
					<Header
						style={{ padding: 0, background: colorBgContainer, height: 50 }}
					>
						<div className="flex justify-end">
							<Dropdown menu={{ items: userItems }}>
								<div className="h-[50px] px-4 font-semibold text-xl flex items-center cursor-pointer hover:bg-slate-200">
									Hello, {userInfo?.email}
								</div>
							</Dropdown>
						</div>
					</Header>
					<Content>{children}</Content>
				</Layout>
			</Spin>
		);
	return null;
};

export default LayoutPage;
