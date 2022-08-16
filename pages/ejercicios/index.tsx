import AuthLayout from "components/auth-layout/auth-layout";
import Header from "components/header/header";
import React, { ReactElement } from "react";
import Link from "next/link";
import Box from "@mui/system/Box";
import Button from "@mui/material/Button";
import ExerciseService from "services/exercise.service";
import { useQuery } from "@tanstack/react-query";
import DebouncedInput from "components/debounced";
import {
	ColumnDef,
	createColumnHelper,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { Exercise } from "models/exercise";
import DataTable from "components/table/Table";
import ExerciseTableActions from "components/exercise/Actions";
import fuzzyFilter from "../../components/table/fuzzyFilter";

const columnHelper = createColumnHelper<Exercise>();

const columns: ColumnDef<Exercise, any>[] = [
	columnHelper.accessor("id", {
		header: "ID",
		cell: info => info.getValue(),
	}),
	columnHelper.accessor("name", {
		header: "Nombre",
		cell: info => info.getValue(),
	}),
	{
		id: "actions",
		header: "Acciones",
		cell: props => <ExerciseTableActions row={props.row} />,
	},
];

const ExercisesPage: any = () => {
	const [globalFilter, setGlobalFilter] = React.useState("");

	const { isLoading, error, data } = useQuery(["excercises"], ExerciseService.getAll, {
		initialData: [],
	});

	const table = useReactTable({
		data,
		columns,
		globalFilterFn: fuzzyFilter,
		state: {
			globalFilter,
		},
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		enableColumnFilters: true,
	});

	if (isLoading) return "Loading...";

	if (error) return `An error has occurred: ${(error as Error).message}`;

	return (
		<div>
			<Header title="Ejercicios" />
			<Box sx={{ mb: 4, px: 2, display: "flex", alignItems: "flex-end" }}>
				<DebouncedInput
					value={globalFilter}
					onChange={value => setGlobalFilter(String(value))}
					placeholder="Buscar..."
					type="search"
				/>

				<Box sx={{ ml: "auto" }}>
					<Link href="ejercicios/nuevo" passHref>
						<Button variant="contained">Agregar</Button>
					</Link>
				</Box>
			</Box>

			<DataTable table={table} />
		</div>
	);
};

export default ExercisesPage;

export async function getStaticProps() {
	return {
		props: {
			isProtected: true,
			userTypes: ["admin"],
		},
	};
}

ExercisesPage.getLayout = function getLayout(page: ReactElement) {
	return <AuthLayout>{page}</AuthLayout>;
};
