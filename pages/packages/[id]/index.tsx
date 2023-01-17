import React, { ReactElement } from "react";
import { GetServerSideProps } from "next";
import { Grid, Paper, Typography } from "@mui/material";

import MainLayout from "components/auth-layout/MainLayout";
import { useQuery } from "@tanstack/react-query";
import PackagesService from "services/packages.service";
import PackageServicesTable from "components/packages/PackageServicesTable";
import MainCard from "components/cards/MainCard";

const PackagePage = ({ id }) => {
	const { data } = useQuery(["package", id], () => PackagesService.get(id), {
		enabled: !!id,
	});

	if (!data) return null;

	return (
		<Grid container columnSpacing={2} rowGap={3}>
			<Grid item xs={6}>
				<Paper>
					<MainCard title="Paquete">
						<Typography variant="h4">{data.name}</Typography>
						<Typography variant="h6">{data.description}</Typography>
						<Typography variant="h6">{data.price}</Typography>
						<Typography variant="h6">{data.duration}</Typography>
						<Typography variant="h6">{data.active}</Typography>
						<Typography variant="h6">{data.createdAt}</Typography>
						<Typography variant="h6">{data.updatedAt}</Typography>
					</MainCard>
				</Paper>
			</Grid>

			<Grid item xs={6}>
				<Paper>
					<PackageServicesTable services={data.services} />
				</Paper>
			</Grid>
		</Grid>
	);
};

export const getServerSideProps: GetServerSideProps = async context => {
	const id = context.params?.id;
	return {
		props: {
			id,
			isProtected: true,
			userTypes: ["Admin"],
		},
	};
};

PackagePage.getLayout = function getLayout(page: ReactElement) {
	return <MainLayout>{page}</MainLayout>;
};

export default PackagePage;
