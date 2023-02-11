import React, { ReactElement } from "react";
import { GetServerSideProps } from "next";
import { Button, Grid, Paper } from "@mui/material";

import MainLayout from "components/auth-layout/MainLayout";
import { useQuery } from "@tanstack/react-query";
import PackagesService from "services/packages.service";
import PackageServicesTable from "components/packages/PackageServicesTable";
import MainCard from "components/cards/MainCard";
import PackageForm2 from "components/packages/PackageForm2";

type PackagePageProps = {
	id: number;
};

const PackagePage = ({ id }: PackagePageProps) => {
	const { data } = useQuery(["package-services", id], () => PackagesService.get(id));

	const [edit, setEdit] = React.useState(false);

	const handleCancel = () => {
		setEdit(prev => !prev);
	};

	if (!data) return null;

	return (
		<Grid container columnSpacing={2} rowGap={3}>
			<Grid item xs={6}>
				<Paper>
					<MainCard title="Paquete">
						<PackageForm2 object={data} edit={edit} onCancel={handleCancel} />

						{!edit && (
							<Button
								type="button"
								sx={{ ml: "auto" }}
								onClick={() => setEdit(prev => !prev)}
								variant="contained"
								color="primary">
								Editar
							</Button>
						)}
					</MainCard>
				</Paper>
			</Grid>

			<Grid item xs={6}>
				<Paper>
					<PackageServicesTable id={id} services={data.services} />
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
