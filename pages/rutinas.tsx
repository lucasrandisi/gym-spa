import AuthLayout from "components/auth-layout/auth-layout";
import React, { ReactElement } from "react";

export default function Rutinas() {
	return <p>Rutinas</p>;
}

Rutinas.getLayout = function getLayout(page: ReactElement) {
	return <AuthLayout>{page}</AuthLayout>;
};
