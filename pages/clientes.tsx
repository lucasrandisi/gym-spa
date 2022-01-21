import AuthLayout from "components/auth-layout";
import React, { ReactElement } from "react";

export default function Clientes() {
	return <p>Clientes</p>;
}

Clientes.getLayout = function getLayout(page: ReactElement) {
	return <AuthLayout>{page}</AuthLayout>;
};
