import { Box } from "@mui/system"
import AuthLayout from "components/auth-layout/auth-layout";
import React, { ReactElement } from "react"


const MiRutinaPage = () => {

    return (
        <Box>Hola</Box>
    );
}


MiRutinaPage.getLayout = function getLayout(page: ReactElement) {
    return <AuthLayout>{page}</AuthLayout>;
};

export default MiRutinaPage;


