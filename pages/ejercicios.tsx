import AuthLayout from "components/auth-layout/auth-layout";
import React, { ReactElement } from "react";

export default function Ejercicios() {
	return <p>Ejercicios</p>;
}

Ejercicios.getLayout = function getLayout(page: ReactElement) {
	return <AuthLayout>{page}</AuthLayout>;
};
