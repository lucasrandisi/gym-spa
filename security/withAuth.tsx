import React from "react";
import { NextComponentType } from "next";
import { useRouter } from "next/router";
import { FullPageLoader } from "components/FullPageLoader";
import { useAuth } from "./auth.context";

const withAuth = (Component: NextComponentType) => {
	function Auth() {
		const router = useRouter();
		const { isAuthenticated, isLoading } = useAuth();

		if (!isLoading && !isAuthenticated) {
			router.push("/login");
		}

		if (isLoading || !isAuthenticated) {
			return <FullPageLoader />;
		}

		return <Component />;
	}

	if (Component.getInitialProps) {
		Auth.getInitialProps = Component.getInitialProps;
	}

	return Auth;
};

export default withAuth;
