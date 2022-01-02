import { Box } from "@mui/system";
import AuthLayout from "components/auth-layout";
import Sidenav from "components/sidenav";
import React, { ReactElement } from "react";

export default function Ejercicios() {
    return <p>Ejercicios</p>;
}

Ejercicios.getLayout = function getLayout(page: ReactElement) {
    return <AuthLayout>{page}</AuthLayout>;
};
