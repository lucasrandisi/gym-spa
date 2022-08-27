import AuthLayout from "components/auth-layout/auth-layout";
import React, { ReactElement } from "react";

export default function Rutinas() {
	return <p>Rutinas</p>;
}

export async function getStaticProps() {
	return {
		props: {
			isProtected: true,
			userTypes: ["admin"],
		},
	};
}

Rutinas.getLayout = function getLayout(page: ReactElement) {
	return <AuthLayout>{page}</AuthLayout>;
};
