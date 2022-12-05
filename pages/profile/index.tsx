import React, { ReactElement } from "react";
import UserService from "services/user.service";
import { useQuery } from "@tanstack/react-query";
import AuthLayout from "components/auth-layout/auth-layout";
import { Avatar, Divider } from "@mui/material";
import ChangePasswordForm from "components/users/ChangePasswordForm";

const ProfilePage: any = () => {
	const { isLoading, error, data } = useQuery(["me"], UserService.me, {
		initialData: null,
	});

	if (isLoading) return "Loading...";

	if (error) return `An error has occurred: ${(error as Error).message}`;

	return (
		<div>
			{/* <Avatar
				src="https://randomuser.me/api/portraits/med/men/75.jpg"
				sx={{ width: 56, height: 56 }}
			/>
			<div>Full name: {data?.name}</div>
			<div>Email: {data?.email}</div>
			<div>Nro Doc: {data?.nroDoc}</div>
			<Divider sx={{ my: 2 }} /> */}

			<ChangePasswordForm />
		</div>
	);
};

export default ProfilePage;

export async function getStaticProps() {
	return {
		props: {
			isProtected: true,
		},
	};
}

ProfilePage.getLayout = function getLayout(page: ReactElement) {
	return <AuthLayout>{page}</AuthLayout>;
};
