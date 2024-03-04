import { Avatar, Button, Col, Image, Row } from "antd";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { apiUserInfo } from "../../api/endpoints";
import { httpClient } from "../../api/query";
import { setLoading } from "../../app/slices/loadingSlice";
import UpdateInfoModal from "./UpdateInfoModal";
import { UserOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const ProfilePage = () => {
	const [openModal, setOpenModal] = useState(false);
	const [userInfo, setUserInfo] = useState({});
	const dispatch = useDispatch();

	const onOpenModal = () => {
		setOpenModal(true);
	};

	const getData = useCallback(async () => {
		dispatch(setLoading(true));
		try {
			const response = await httpClient({ method: "GET", url: apiUserInfo });
			setUserInfo(response?.data?.data ?? {});
		} catch (error) {
			console.error(error);
		} finally {
			dispatch(setLoading(false));
		}
	}, [dispatch]);

	useEffect(() => {
		getData();
	}, [getData]);

	return (
		<Fragment>
			<div className="p-5">
				<div className="mx-auto flex flex-col sm:flex-row gap-5 border p-4 bg-white rounded w-full sm:w-[600px]">
					<div className="flex self-center">
						{userInfo?.avatar ? (
							<Image
								src={userInfo?.avatar}
								width={120}
								height={120}
								preview={false}
							/>
						) : (
							<Avatar
								size={{ xs: 64, sm: 64, md: 64, lg: 64, xl: 80, xxl: 100 }}
								icon={<UserOutlined />}
							/>
						)}
					</div>
					<div className="">
						<h1 className="text-2xl mb-2">{userInfo?.email}</h1>
						<Row>
							<Col span={10} className="font-semibold">
								Description:
							</Col>
							<Col span={14}>{userInfo?.description}</Col>
							<Col span={10} className="font-semibold">
								Date of birth:
							</Col>
							<Col span={14}>
								{dayjs(userInfo?.dateOfBirth).format("DD/MM/YYYY")}
							</Col>
						</Row>
					</div>
				</div>
				<div className="flex justify-center">
					<Button type="primary" className="mt-5" onClick={onOpenModal}>
						Update information
					</Button>
				</div>
			</div>
			<UpdateInfoModal
				open={openModal}
				setOpen={setOpenModal}
				info={userInfo}
				reloadData={getData}
			/>
		</Fragment>
	);
};

export default ProfilePage;
