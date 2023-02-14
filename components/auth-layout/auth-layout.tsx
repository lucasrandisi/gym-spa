import React, { ReactNode } from "react";

import MainLayout from "./MainLayout";

export default function AuthLayout({ children }: { children: ReactNode }) {
	return <MainLayout>{children}</MainLayout>;
}
