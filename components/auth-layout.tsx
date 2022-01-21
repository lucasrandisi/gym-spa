import { Box } from "@mui/system";
import React, { ReactNode } from "react";
import Sidenav from "./nav/Nav";

export default function AuthLayout({ children }: { children: ReactNode }) {
	return (
		<Box sx={{ display: "flex", minHeight: "100vh" }}>
			<Sidenav />
			{children}
		</Box>
	);
}
