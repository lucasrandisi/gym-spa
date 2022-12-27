import { Box } from "@mui/material";
import AuthLayout from "components/auth-layout/auth-layout";
import Header from "components/header/header";
import {
	MuscleGroupForm,
	MuscleGroupFormType,
} from "components/muscle-groups/MuscleGroupForm";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { ReactElement } from "react";
import { api } from "services/api";

const initialValues: MuscleGroupFormType = {
	name: "",
};

const NewMuscleGroup: any = () => {
	const router = useRouter();
	const { enqueueSnackbar } = useSnackbar();

	function onSubmit(values: MuscleGroupFormType) {
		api.post("/api/muscle-groups", values).then(() => {
			enqueueSnackbar("Grupo Muscular registrado", { variant: "success" });
			router.push("/grupos-musculares");
		});
	}

	return (
		<>
			<Header title="Grupos Musculares" />
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<MuscleGroupForm initialValues={initialValues} onSubmit={onSubmit} />
			</Box>
		</>
	);
};

export async function getServerSideProps() {
	return {
		props: {
			isProtected: true,
			userTypes: ["Admin"],
		},
	};
}

export default NewMuscleGroup;

NewMuscleGroup.getLayout = function getLayout(page: ReactElement) {
	return <AuthLayout>{page}</AuthLayout>;
};
