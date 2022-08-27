import React, { ReactElement } from "react";
import { useAuth } from "security/auth.context";
import AuthLayout from "components/auth-layout/auth-layout";

const HomePage = () => {
	const { user } = useAuth();
	return (
		<div>
			<h2>Bienvenido</h2>
			<pre>{JSON.stringify(user)}</pre>
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
