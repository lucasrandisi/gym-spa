import React, { ReactElement } from "react";
import { useAuth } from "security/auth.context";
import AuthLayout from "components/auth-layout/auth-layout";
import { useSnackbar } from "notistack";

const HomePage = () => {
	const { user } = useAuth();
	const { enqueueSnackbar } = useSnackbar();
	return (
		<div>
			<h2>Bienvenido</h2>
			<pre>{JSON.stringify(user)}</pre>

			<button
				type="button"
				onClick={() => enqueueSnackbar("Ocurrio un error", { variant: "error" })}>
				Error
			</button>
			<button
				type="button"
				onClick={() => enqueueSnackbar("Ocurrio un error", { variant: "success" })}>
				Ok
			</button>
			<button
				type="button"
				onClick={() => enqueueSnackbar("Ocurrio un error", { variant: "warning" })}>
				Warn
			</button>
			<button
				type="button"
				onClick={() => enqueueSnackbar("Ocurrio un error", { variant: "info" })}>
				Info
			</button>
		</div>
	);
};

export async function getStaticProps() {
	return {
		props: {
			isProtected: true,
		},
	};
}

export default HomePage;

HomePage.getLayout = function getLayout(page: ReactElement) {
	return <AuthLayout>{page}</AuthLayout>;
};
