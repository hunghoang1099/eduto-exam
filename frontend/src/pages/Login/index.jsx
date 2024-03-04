import { Button, Card, Flex, Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../app/slices/userSlice";
import { httpClient } from "../../api/query";
import { apiLogin } from "../../api/endpoints";
import { ERROR_MESSAGE, TOKEN } from "../../constant";
import { setLoading } from "../../app/slices/loadingSlice";

const LoginPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onSubmit = async (values) => {
		dispatch(setLoading(true));
		try {
			const response = await httpClient({
				method: "POST",
				url: apiLogin,
				data: values,
			});

			if (response.status === 200) {
				message.success(response?.data?.message);
				localStorage.setItem("isLogin", JSON.stringify(true));
				localStorage.setItem(
					"userInfo",
					JSON.stringify({ email: values?.email })
				);
				localStorage.setItem(TOKEN, response?.data?.data?.access_token);
				dispatch(login({ email: values.email }));
				navigate("/profile");
			} else {
				message.error(response?.data?.message || ERROR_MESSAGE);
			}
		} catch (error) {
			console.error(error);
		} finally {
			dispatch(setLoading(false));
		}
	};

	return (
		<Flex justify="center">
			<div className="w-[600px] mt-40">
				<h1 className="text-center font-semibold text-3xl mb-5">Login</h1>
				<Card>
					<Form
						labelCol={{ span: 6 }}
						labelAlign="left"
						wrapperCol={{ span: 18 }}
						onFinish={onSubmit}
						autoComplete="off"
					>
						<Form.Item name="email" label="Email" rules={[{ required: true }]}>
							<Input />
						</Form.Item>
						<Form.Item
							name="password"
							label="Password"
							rules={[{ required: true }]}
						>
							<Input.Password />
						</Form.Item>
						<div className="text-center mt-5">
							<Button type="primary" htmlType="submit">
								Login
							</Button>
						</div>
					</Form>
				</Card>
			</div>
		</Flex>
	);
};

export default LoginPage;
