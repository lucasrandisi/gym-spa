import React from "react";
import Link from "next/link";
import { ButtonBase } from "@mui/material";
import Logo from "./Logo";

const LogoSection = () => (
	<ButtonBase disableRipple LinkComponent={Link}>
		<Logo />
	</ButtonBase>
);

export default LogoSection;
