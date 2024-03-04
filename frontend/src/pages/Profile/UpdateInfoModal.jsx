import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { DatePicker, Form, Input, Modal, Upload, message } from "antd";
import classNames from "classnames";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { apiUpdateUserInfo } from "../../api/endpoints";
import { httpClient } from "../../api/query";
import { setLoading } from "../../app/slices/loadingSlice";
import styles from "./styles.module.scss";

const normFile = (e) => {
	if (Array.isArray(e)) {
		return e;
	}
	return e?.fileList;
};

const initialValues = {
	email: "",
	avatar: "",
	description: "",
	dateOfBirth: "",
};

const getBase64 = (img, callback) => {
	const reader = new FileReader();
	reader.addEventListener("load", () => callback(reader.result));
	reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
	const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
	if (!isJpgOrPng) {
		message.error("You can only upload JPG/PNG file!");
	}
	const isLt2M = file.size / 1024 / 1024 < 2;
	if (!isLt2M) {
		message.error("Image must smaller than 2MB!");
	}
	return false;
};

const UpdateInfoModal = ({ open, setOpen, info, reloadData }) => {
	const [form] = Form.useForm();
	const [imageUrl, setImageUrl] = useState();
	const dispatch = useDispatch();

	const onCancel = () => {
		setOpen(false);
	};

	const handleChange = (info) => {
		getBase64(info.file, (url) => {
			setImageUrl(url);
		});
	};

	const uploadButton = (
		<button
			style={{
				border: 0,
				background: "none",
			}}
			type="button"
		>
			<PlusOutlined />
			<div
				style={{
					marginTop: 8,
				}}
			>
				Upload
			</div>
		</button>
	);

	const onRemoveAvatar = (e) => {
		setImageUrl(null);
		e.preventDefault();
	};

	const onUpdate = async () => {
		dispatch(setLoading(true));
		try {
			const values = await form.validateFields();
			const valueSubmit = {
				avatar: imageUrl,
				email: info?.email,
				description: values?.description,
				dateOfBirth: values?.dateOfBirth,
			};
			const response = await httpClient({
				method: "PATCH",
				url: `${apiUpdateUserInfo}/${info?.id}`,
				data: valueSubmit,
			});
			if (response?.status === 200) {
				onCancel();
				reloadData();
			} else {
				response?.data?.message?.forEach((errorMessage) =>
					message.error(errorMessage)
				);
			}
		} catch (error) {
			console.error(error);
		} finally {
			dispatch(setLoading(false));
		}
	};

	useEffect(() => {
		form.setFieldsValue({
			email: info.email,
			avatar: info.avatar,
			description: info.description,
			dateOfBirth: dayjs(info.dateOfBirth),
		});
		setImageUrl(info.avatar);
	}, [form, info]);

	return (
		<Modal
			open={open}
			onCancel={onCancel}
			title="Update information"
			okText="Update"
			onOk={onUpdate}
		>
			<Form
				form={form}
				initialValues={initialValues}
				autoComplete="off"
				labelCol={{ span: 6 }}
				wrapperCol={{ span: 18 }}
				labelAlign="left"
			>
				<Form.Item
					label="Avatar"
					valuePropName="list"
					getValueFromEvent={normFile}
				>
					{imageUrl ? (
						<div className={classNames("relative w-[100px]", styles.avatar)}>
							<img
								src={imageUrl}
								alt="avatar"
								className="w-[100px] rounded-full border border-dashed p-1 rounded-full avatar-uploader mb-2"
							/>
							<div
								className={classNames(
									"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden cursor-pointer w-24 h-24 rounded-full justify-center items-center text-white",
									styles.remove
								)}
								onClick={onRemoveAvatar}
							>
								<DeleteOutlined className="text-xl" />
							</div>
						</div>
					) : (
						<Upload
							name="avatar"
							listType="picture-circle"
							className="avatar-uploader"
							showUploadList={false}
							beforeUpload={beforeUpload}
							onChange={!imageUrl && handleChange}
						>
							{uploadButton}
						</Upload>
					)}
				</Form.Item>
				<Form.Item name="email" label="Email">
					<Input disabled />
				</Form.Item>
				<Form.Item
					name="description"
					label="Description"
					rules={[{ max: 128 }]}
				>
					<Input.TextArea maxLength={128} rows={3} />
				</Form.Item>
				<Form.Item name="dateOfBirth" label="Date of birth">
					<DatePicker className="w-full" />
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default UpdateInfoModal;
