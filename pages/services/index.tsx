import React, { ReactElement } from "react";

import { Grid } from "@mui/material";

import MainLayout from "components/auth-layout/MainLayout";
import PackagesTable from "components/packages/PackagesTable";
import ServicesTable from "components/services/ServicesTable";

const ServicesPage = () => (
	<Grid container columnSpacing={2}>
		<Grid item xs={6}>
			<ServicesTable />
		</Grid>
		<Grid item xs={6}>
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

ServicesPage.getLayout = function getLayout(page: ReactElement) {
	return <MainLayout>{page}</MainLayout>;
};

export default ServicesPage;
