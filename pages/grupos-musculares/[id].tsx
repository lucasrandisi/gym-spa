import { Box } from "@mui/material";
import AuthLayout from "components/auth-layout/auth-layout";
import Header from "components/header/header";
import {
	MuscleGroupForm,
	MuscleGroupFormType,
} from "components/muscle-groups/MuscleGroupForm";
import { MuscleGroup } from "models/muscle-group";
import { NextApiRequest } from "next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { ReactElement } from "react";
import { api } from "services/api";

type EditMuscleGroupProps = {
	muscleGroup: MuscleGroup;
};

const EditMuscleGroup: any = ({ muscleGroup }: EditMuscleGroupProps) => {
	const router = useRouter();
	const { enqueueSnackbar } = useSnackbar();

	const initialValues: MuscleGroupFormType = {
		name: muscleGroup.name,
	};

	function onSubmit(values: MuscleGroupFormType) {
		api.put(`/api/muscle-groups/${muscleGroup.id}`, values).then(() => {
			enqueueSnackbar("Grupo Muscular actualizado", { variant: "success" });
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

export async function getServerSideProps({
	req,
	params,
}: {
	req: NextApiRequest;
	params: { id: string };
}) {
	const muscleGroupResponse = await api.get(`/api/muscle-groups/${params.id}`, {
		headers: {
			Authorization: `Bearer ${req.cookies.access_token}`,
		},
	});

	return {
		props: {
			muscleGroup: muscleGroupResponse.data,
			isProtected: true,
			userTypes: ["Admin"],
		},
	};
}

export default EditMuscleGroup;

EditMuscleGroup.getLayout = function getLayout(page: ReactElement) {
	return <AuthLayout>{page}</AuthLayout>;
};
