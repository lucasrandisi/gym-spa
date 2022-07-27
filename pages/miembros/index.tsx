import React from "react";

import AuthLayout from "components/auth-layout/auth-layout";
import Header from "components/header/header";

import UserService, { User } from "services/user.service";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import withAuth from "security/withAuth";
import {
	createColumnHelper,
	useReactTable,
	getFilteredRowModel,
	getCoreRowModel,
	getPaginationRowModel,
	ColumnDef,
	FilterFn,
} from "@tanstack/react-table";
import { rankItem } from "@tanstack/match-sorter-utils";
import DataTable from "components/table/Table";
import DebouncedInput from "components/debounced";

const columnHelper = createColumnHelper<User>();

const columns: ColumnDef<User, any>[] = [
	columnHelper.accessor("id", {
		header: "ID",
		cell: info => info.getValue(),
	}),
	columnHelper.accessor("nroDoc", {
		header: "DNI",
		cell: info => info.getValue(),
	}),
	columnHelper.accessor("name", {
		header: "Nombre",
		cell: info => info.getValue(),
	}),
	columnHelper.accessor("email", {
		header: "Email",
		cell: info => info.getValue(),
	}),
	{
		id: "actions",
		header: "Acciones",
		cell: props => (
			<div>
				<Link href={`/miembros/${props.row.id}/rutina`} passHref>
					<Button variant="contained">Rutina</Button>
				</Link>
				<Link href={`/miembros/${props.row.id}/editar`} passHref>
					<IconButton aria-label="edit">
						<EditIcon />
					</IconButton>
				</Link>
			</div>
		),
	},
];

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
	const itemRank = rankItem(row.getValue(columnId), value);
	addMeta({
		itemRank,
	});
	return itemRank.passed;
};

const UsersPage: any = () => {
	const [globalFilter, setGlobalFilter] = React.useState("");

	const { isLoading, error, data } = useQuery(["users"], UserService.getAll, {
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
		enablePinning: true,
	});

	if (isLoading) return "Loading...";

	if (error) return `An error has occurred: ${(error as Error).message}`;

	return (
		<AuthLayout>
			<Header title="Miembros" />
			<DebouncedInput
				value={globalFilter}
				onChange={value => setGlobalFilter(String(value))}
				placeholder="Buscar..."
			/>
			<DataTable table={table} />
		</AuthLayout>
	);
};

export default withAuth(UsersPage);
