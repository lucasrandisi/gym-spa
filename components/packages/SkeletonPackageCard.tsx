import React from "react";
import { Card, Grid } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

const PackageCardSkeleton = () => (
	<Card sx={{ p: 2.25 }}>
		<Grid container direction="column" rowGap={2}>
			<Grid item>
				<Skeleton variant="rectangular" height={30} />
			</Grid>
			<Grid item>
				<Skeleton variant="rectangular" height={20}  width={95}/>
			</Grid>
			<Grid item>
				<Grid container justifyContent="space-between">
					{[...Array(3)].map(id => (
						<Grid item xs={4} key={id}>
							<Skeleton variant="rectangular" width={70} height={30} />
						</Grid>
					))}
				</Grid>
			</Grid>
		</Grid>
	</Card>
);

export default PackageCardSkeleton;
