import React from "react";
import UserService from "services/user.service";
import { useQuery } from "@tanstack/react-query";
import withAuth from "security/withAuth";
import AuthLayout from "components/auth-layout/auth-layout";
import { Avatar } from "@mui/material";

const ProfilePage: any = () => {
	const { isLoading, error, data } = useQuery(["me"], UserService.me, {
		initialData: null,
	});

	if (isLoading) return "Loading...";

	if (error) return `An error has occurred: ${(error as Error).message}`;

	return (
		<AuthLayout>
			<div>
				<Avatar
					src="https://randomuser.me/api/portraits/med/men/75.jpg"
					sx={{ width: 56, height: 56 }}
				/>
				<div>Full name: {data?.name}</div>
				<div>Email: {data?.email}</div>
				<div>Nro Doc: {data?.nroDoc}</div>
			</div>
		</AuthLayout>
	);
};

export default withAuth(ProfilePage);
