import { Box } from "@mui/system"
import AuthLayout from "components/auth-layout/auth-layout";
import { NextApiRequest } from "next";
import React, { ReactElement } from "react"
import { useAuth } from "security/auth.context";
import { api } from "services/api";


const MiRutinaPage = () => {
    const { user } = useAuth();
    console.log(user);
    

    return (
        <Box>Hola</Box>
    );
}

export async function getServerSideProps({ req }: { req: NextApiRequest }) {
    const exercisesResponse = await api.get('/api/exercises', {
        headers: {
            Authorization: "Bearer " + req.cookies.access_token
        }
    });

    return {
        props: {
            exercisesList: exercisesResponse.data,
            isProtected: true,
            userTypes: ["Admin", "User"],
        }
    };
}


MiRutinaPage.getLayout = function getLayout(page: ReactElement) {
    return <AuthLayout>{page}</AuthLayout>;
};

export default MiRutinaPage;


