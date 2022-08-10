import AuthLayout from "components/auth-layout/auth-layout";
import React, { ReactElement } from "react";

const Dashboard = () => <h1> My private page only for admins</h1>;

export async function getStaticProps() {
	return {
		props: {
			isProtected: true,
			userTypes: ["admin"],
		},
	};
}

export default Dashboard;

Dashboard.getLayout = function getLayout(page: ReactElement) {
	return <AuthLayout>{page}</AuthLayout>;
};
