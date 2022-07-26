import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
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
	flexRender,
	getCoreRowModel,
	ColumnDef,
} from "@tanstack/react-table";

const columnHelper = createColumnHelper<User>();

const columns: ColumnDef<User, any>[] = [
	columnHelper.accessor("id", {
		cell: info => info.getValue(),
	}),
	columnHelper.accessor("nroDoc", {
		cell: info => info.getValue(),
	}),
	columnHelper.accessor("name", {
		cell: info => info.getValue(),
	}),
	columnHelper.accessor("email", {
		cell: info => info.getValue(),
	}),
	{
		id: "actions",
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

const UsersPage: any = () => {
	const { isLoading, error, data } = useQuery(["users"], UserService.getAll, {
		initialData: [],
	});

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	if (isLoading) return "Loading...";

	if (error) return `An error has occurred: ${(error as Error).message}`;

	return (
		<AuthLayout>
			<Header title="Miembros" />

			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						{table.getHeaderGroups().map(headerGroup => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map(header => (
									<TableCell key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(header.column.columnDef.header, header.getContext())}
									</TableCell>
								))}
							</TableRow>
						))}
					</TableHead>
					<TableBody>
						{table.getRowModel().rows.map(row => (
							<TableRow key={row.id}>
								{row.getVisibleCells().map(cell => (
									<td key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</AuthLayout>
	);
};

export default withAuth(UsersPage);
