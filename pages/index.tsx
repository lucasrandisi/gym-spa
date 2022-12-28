import React, { ReactElement } from "react";
import AuthLayout from "components/auth-layout/auth-layout";
import Header from "components/header/header";
import UserStatusBox from "components/users/UserStatus";
import { Box } from "@mui/system";

const HomePage = () => (
	<>
		<Header title="Bienvenido" />

		<Box sx={{display: "grid"}}>
			<UserStatusBox />
		</Box>
	</>
);

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
