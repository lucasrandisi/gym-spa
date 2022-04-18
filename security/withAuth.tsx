import React, { useEffect } from "react";
import { NextComponentType } from "next";
import { useRouter } from "next/router";
import { useAuth } from "./auth.context";
import { FullPageLoader } from "components/FullPageLoader";

const withAuth = (Component: NextComponentType) => {
	const Auth = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode }) => {
		const router = useRouter();
		const { isAuthenticated, isLoading } = useAuth();

		useEffect(() => {
			if (!isLoading && !isAuthenticated) {
				router.push("/login");
			}
		}, [isLoading, isAuthenticated]);

		if (isLoading || !isAuthenticated) {
			return <FullPageLoader />;
		}

		return <Component {...props} />;
	};

	if (Component.getInitialProps) {
		Auth.getInitialProps = Component.getInitialProps;
	}

	return Auth;
};

export default withAuth;
