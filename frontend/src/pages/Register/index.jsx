import { Button, Card, Flex, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { httpClient } from "../../api/query";
import { apiRegister } from "../../api/endpoints";
import { useState } from "react";
import { ERROR_MESSAGE } from "../../constant";

const RegisterPage = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);

	const onSubmit = async (values) => {
		setLoading(true);
		try {
			const response = await httpClient({
				method: "POST",
				url: apiRegister,
				data: { email: values.email, password: values.password },
			});

			if (response.status === 201) {
				message.success(response?.data?.message);
				navigate("/login");
			} else if (response.status === 400) {
				response?.data?.message?.forEach((errorMessage) =>
					message.error(errorMessage)
				);
			} else {
				message.error(ERROR_MESSAGE);
			}
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Flex justify="center">
			<div className="mt-40">
				<h1 className="text-center font-semibold text-3xl mb-5">Register</h1>
				<Card className="w-full sm:w-[600px]">
					<Form
						labelCol={{ span: 6 }}
						wrapperCol={{ span: 18 }}
						labelAlign="left"
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
						<Form.Item
							name="confirm"
							label="Confirm Password"
							dependencies={["password"]}
							hasFeedback
							rules={[
								{
									required: true,
								},
								({ getFieldValue }) => ({
									validator(_, value) {
										if (!value || getFieldValue("password") === value) {
											return Promise.resolve();
										}
										return Promise.reject(
											new Error("Confirm password is not match!")
										);
									},
								}),
							]}
						>
							<Input.Password />
						</Form.Item>
						<div className="text-center mt-5">
							<Button type="primary" htmlType="submit" loading={loading}>
								Register
							</Button>
						</div>
					</Form>
				</Card>
			</div>
		</Flex>
	);
};

export default RegisterPage;
