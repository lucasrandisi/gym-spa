import { Box } from "@mui/material";
import AuthLayout from "components/auth-layout/auth-layout";
import Header from "components/header/header";
import { UserForm, UserFormType } from "components/users/UserForm";
import { Rol } from "models/rol";
import { NextApiRequest } from "next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { ReactElement, useState } from "react";
import { api } from "services/api";

const initialValues: UserFormType = {
	name: "",
	email: "",
	password: "",
	nroDoc: "",
	rolId: 2,
};

const NewUser: any = ({ roles }: { roles: Rol[] }) => {
	const router = useRouter();
	const { enqueueSnackbar } = useSnackbar();
	const [submitError, setSubmitError] = useState(null);

	function onSubmit(values: UserFormType) {
		api
			.post("/api/users", values)
			.then(() => {
				enqueueSnackbar("Usuario Registrado", { variant: "success" });
				router.push("/usuarios");
			})
			.catch(errorResponse => {
				setSubmitError(errorResponse.message);
			});
	}

	return (
		<>
			<Header title="Registrar Usuario" />
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<UserForm
					initialValues={initialValues}
					onSubmit={onSubmit}
					roles={roles}
					passwordInput
					submitError={submitError}
				/>
			</Box>
		</>
	);
};

export async function getServerSideProps({ req }: { req: NextApiRequest }) {
	const [rolesResponse] = await Promise.all([
		api.get("/api/roles", {
			headers: {
				Authorization: `Bearer ${req.cookies.access_token}`,
			},
		}),
	]);

	return {
		props: {
			roles: rolesResponse.data,
			isProtected: true,
			userTypes: ["Admin"],
		},
	};
}

export default NewUser;

NewUser.getLayout = function getLayout(page: ReactElement) {
	return <AuthLayout>{page}</AuthLayout>;
};
