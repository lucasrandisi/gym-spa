import { Box, Snackbar } from "@mui/material";
import AuthLayout from "components/auth-layout/auth-layout";
import Header from "components/header/header";
import { UserForm } from "components/users/UserForm";
import { Rol } from "models/rol";
import { Routine } from "models/routine";
import { User } from "models/user";
import { NextApiRequest } from "next";
import { useRouter } from "next/router";
import React, { ReactElement, useState } from "react";
import { api } from "services/api";


const EditUser: any = ({ roles, user, routines }: { roles: Rol[], user: User, routines: Routine[] }) => {
    const router = useRouter()
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const initialValues: UserForm = {
        name: user.name,
        email: user.email,
        nroDoc: user.nroDoc,
        rolId: 2,
        routineId: user.routine ? user.routine.id : "",
    };

    function onSubmit(values: UserForm) {
        api.put(`/api/users/${user.id}`, values)
            .then(() => {
                setOpenSnackbar(true);

                setTimeout(() => router.push("/usuarios"), 2000);
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
                    routines={routines}
                    passwordInput={false}
                />
            </Box>
            <Snackbar
                open={openSnackbar}
                message="Usuario Actualizado"
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            />
        </>
    );
}


export async function getServerSideProps({ req, params }: { req: NextApiRequest, params: { id: string } }) {
    const [rolesResponse, routinesResponse, userResponse] = await Promise.all([
        api.get('/api/roles', {
            headers: {
                Authorization: "Bearer " + req.cookies.access_token
            }
        }),
        api.get('/api/routines', {
            headers: {
                Authorization: "Bearer " + req.cookies.access_token
            }
        }),
        api.get(`/api/users/${params.id}`, {
            headers: {
                Authorization: "Bearer " + req.cookies.access_token
            }
        })
    ]);

    return {
        props: {
            roles: rolesResponse.data,
            routines: routinesResponse.data,
            user: userResponse.data,
            isProtected: true,
            userTypes: ["Admin"],
        }
    };
}


export default EditUser;

EditUser.getLayout = function getLayout(page: ReactElement) {
    return <AuthLayout>{page}</AuthLayout>;
};