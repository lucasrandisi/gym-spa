import React from "react";
import {
	Table as MaterialTable,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	TableFooter,
	IconButton,
} from "@mui/material";

import { flexRender, Table } from "@tanstack/react-table";
import {
	KeyboardArrowRight,
	KeyboardArrowLeft,
	LastPage,
	FirstPage,
} from "@mui/icons-material";

type DataTableProps<T> = {
	table: Table<T>;
};

const DataTable = <TData extends object>(props: DataTableProps<TData>) => {
	const { table } = props;

	return (
		<TableContainer component={Paper}>
			<MaterialTable>
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
			</MaterialTable>

			<TableFooter>
				<TableRow style={{ display: "flex", gap: 2, alignItems: "center" }}>
					<span style={{ display: "flex", gap: 1, alignItems: "center" }}>
						<div>Page</div>
						<strong>
							{table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
						</strong>
					</span>

					<div>
						<IconButton
							onClick={() => table.setPageIndex(0)}
							disabled={!table.getCanPreviousPage()}
							aria-label="first page">
							<FirstPage />
						</IconButton>
						<IconButton
							onClick={() => table.previousPage()}
							disabled={!table.getCanPreviousPage()}
							aria-label="previous page">
							<KeyboardArrowLeft />
						</IconButton>
						<IconButton
							onClick={() => table.nextPage()}
							disabled={!table.getCanNextPage()}
							aria-label="next page">
							<KeyboardArrowRight />
						</IconButton>
						<IconButton
							onClick={() => table.setPageIndex(table.getPageCount() - 1)}
							disabled={!table.getCanNextPage()}
							aria-label="last page">
							<LastPage />
						</IconButton>
					</div>
				</TableRow>
			</TableFooter>
		</TableContainer>
	);
};

export default DataTable;
