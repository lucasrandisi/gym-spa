import AuthLayout from "components/auth-layout";
import Sidenav from "components/sidenav";
import React, { ReactElement } from "react";

export default function Clientes() {
    return <p>Clientes</p>;
}

Clientes.getLayout = function getLayout(page: ReactElement) {
    return <AuthLayout>{page}</AuthLayout>;
};
