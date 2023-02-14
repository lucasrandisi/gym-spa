import React, { ReactElement } from "react";

import { Grid } from "@mui/material";

import MainLayout from "components/auth-layout/MainLayout";
import { useQuery } from "@tanstack/react-query";
import PackagesService from "services/packages.service";
import PackageCard from "components/packages/PackageCard";

const PackagesShowcasePage = () => {
	const { isLoading, error, data } = useQuery(
		["available-packages"],
		PackagesService.findAllActive,
		{ initialData: [] }
	);

	if (error) return `An error has occurred: ${(error as Error).message}`;

	return (
		<Grid container columnSpacing={2} rowSpacing={2}>
			{isLoading &&
				// Fill the grid with skeleton cards
				[...Array(12)].map(id => (
					<Grid item xs={2} key={id}>
						<PackageCard loading />
					</Grid>
				))}
			{!isLoading &&
				data.map(p => (
					<Grid item xs={3} key={p.id}>
						<PackageCard item={p} />
					</Grid>
				))}
		</Grid>
	);
};

export async function getStaticProps() {
	return {
		props: {
			isProtected: true,
		},
	};
}

PackagesShowcasePage.getLayout = function getLayout(page: ReactElement) {
	return <MainLayout>{page}</MainLayout>;
};

export default PackagesShowcasePage;
