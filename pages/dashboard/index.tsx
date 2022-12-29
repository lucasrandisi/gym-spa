import React, { ReactElement, useEffect, useState } from "react";
import Header from "components/header/header";
import EarningCard from "components/cards/EarningCard";
import TotalIncomeLightCard from "components/cards/TotalIncomeLightCard";
import TotalIncomeDarkCard from "components/cards/TotalIncomeDarkCard";
import { Grid } from "@mui/material";
import MainLayout from "components/auth-layout/MainLayout";

const DashboardPage = () => {
	const [isLoading, setLoading] = useState(true);
	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 1000);
	}, []);

	return (
		<>
			<Header title="Dashboard" />

			<Grid container spacing={3}>
				<Grid item xs={12}>
					<Grid container spacing={3}>
						<Grid item lg={4} md={6} sm={6} xs={12}>
							<EarningCard isLoading={isLoading} />
						</Grid>
						<Grid item lg={4} md={6} sm={6} xs={12}>
							<EarningCard isLoading={isLoading} />
						</Grid>
						<Grid item lg={4} md={12} sm={12} xs={12}>
							<Grid container spacing={3}>
								<Grid item sm={6} xs={12} md={6} lg={12}>
									<TotalIncomeDarkCard isLoading={isLoading} />
								</Grid>
								<Grid item sm={6} xs={12} md={6} lg={12}>
									<TotalIncomeLightCard isLoading={isLoading} />
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</>
	);
};

export async function getStaticProps() {
	return {
		props: {
			isProtected: true,
		},
	};
}
DashboardPage.getLayout = function getLayout(page: ReactElement) {
	return <MainLayout>{page}</MainLayout>;
};

export default DashboardPage;
