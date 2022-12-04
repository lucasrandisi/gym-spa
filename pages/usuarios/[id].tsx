import { Box, Snackbar } from "@mui/material";
import AuthLayout from "components/auth-layout/auth-layout";
import Header from "components/header/header";
import { UserForm, UserFormType } from "components/users/UserForm";
import { Rol } from "models/rol";
import { User } from "models/user";
import { NextApiRequest } from "next";
import { useRouter } from "next/router";
import React, { ReactElement, useState } from "react";
import { api } from "services/api";

const EditUser: any = ({ roles, user }: { roles: Rol[]; user: User }) => {
	const router = useRouter();
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [submitError, setSubmitError] = useState(null);

	const initialValues: UserFormType = {
		name: user.name,
		email: user.email,
		nroDoc: user.nroDoc,
		rolId: user.roles[0].id,
	};

	function onSubmit(values: UserFormType) {
		api
			.put(`/api/users/${user.id}`, values)
			.then(() => {
				setOpenSnackbar(true);

				setTimeout(() => router.push("/usuarios"), 2000);
			})
			.catch(errorResponse => {
				setSubmitError(errorResponse.message);
			});
	}

	return (
		<>
			<Header title="Actualizar Usuario" />
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<UserForm
					initialValues={initialValues}
					onSubmit={onSubmit}
					roles={roles}
					passwordInput={false}
					submitError={submitError}
				/>
			</Box>
			<Snackbar
				open={openSnackbar}
				message="Usuario Actualizado"
				anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
			/>
		</>
	);
};

export async function getServerSideProps({
	req,
	params,
}: {
	req: NextApiRequest;
	params: { id: string };
}) {
	const [rolesResponse, userResponse] = await Promise.all([
		api.get("/api/roles", {
			headers: {
				Authorization: `Bearer ${req.cookies.access_token}`,
			},
		}),
		api.get(`/api/users/${params.id}`, {
			headers: {
				Authorization: `Bearer ${req.cookies.access_token}`,
			},
		}),
	]);

	return {
		props: {
			roles: rolesResponse.data,
			user: userResponse.data,
			isProtected: true,
			userTypes: ["Admin"],
		},
	};
}

export default EditUser;

EditUser.getLayout = function getLayout(page: ReactElement) {
	return <AuthLayout>{page}</AuthLayout>;
};
