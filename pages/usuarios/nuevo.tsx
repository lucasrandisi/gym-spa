import { Box, Snackbar } from "@mui/material";
import AuthLayout from "components/auth-layout/auth-layout";
import Header from "components/header/header";
import { UserForm } from "components/users/UserForm";
import { Rol } from "models/rol";
import { NextApiRequest } from "next";
import { useRouter } from "next/router";
import React, { ReactElement, useState } from "react";
import { api } from "services/api";


const NewUser: any = ( {roles}: { roles: Rol[] } ) => {
	const router = useRouter()
	const [openSnackbar, setOpenSnackbar] = useState(false);

    const initialValues: UserForm = {
        name: "",
        email: "",
        password: "",
        nroDoc: "",
        rolId: 2,
	};

    function onSubmit(values: UserForm) {
		api.post("/api/users", values)
			.then(() => {
				setOpenSnackbar(true);

				setTimeout(() => router.push("/usuarios"), 2000);
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
				/>
			</Box>
			<Snackbar
				open={openSnackbar}
				message="Usuario Registrado"
				anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
			/>
		</>
	);
}


export async function getServerSideProps({ req }: { req: NextApiRequest }) {
    const rolesResponse = await api.get('/api/roles', {
        headers: {
            Authorization: "Bearer " + req.cookies.access_token
        }
    });

    return {
        props: {
            roles: rolesResponse.data,
            isProtected: true,
            userTypes: ["admin"],
        }
    };
}


export default NewUser;

NewUser.getLayout = function getLayout(page: ReactElement) {
	return <AuthLayout>{page}</AuthLayout>;
};