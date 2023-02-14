import React, { ReactElement } from "react";

import { Grid } from "@mui/material";

import MainLayout from "components/auth-layout/MainLayout";
import PackagesTable from "components/packages/PackagesTable";

const PackagesPage = () => (
	<Grid container columnSpacing={2}>
		<Grid item xs={12}>
			<PackagesTable />
		</Grid>
	</Grid>
);

export async function getStaticProps() {
	return {
		props: {
			isProtected: true,
			userTypes: ["Admin"],
		},
	};
}

PackagesPage.getLayout = function getLayout(page: ReactElement) {
	return <MainLayout>{page}</MainLayout>;
};

export default PackagesPage;
