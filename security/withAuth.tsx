import React from "react";
import { useRouter } from "next/router";
import FullPageLoader from "components/FullPageLoader";
import { NextComponentType } from "next";
import { useAuth } from "./auth.context";

const withAuth = <P extends object>(
	Component: NextComponentType<P>,
	roles: string[] | null = null
) => {
	const Auth = (props: P) => {
		const router = useRouter();
		const { isAuthenticated, isLoading, user } = useAuth();

		if (!isLoading && !isAuthenticated) {
			router.push("/login");
		}

		if (isLoading || !isAuthenticated) {
			return <FullPageLoader />;
		}

		if (roles && isAuthenticated && user) {
			if (!roles.some(r => r === user.roles[0].name.toUpperCase())) {
				router.push("/");
			}
		}

		// eslint-disable-next-line react/jsx-props-no-spreading
		return <Component {...props} />;
	};

	if (Component.getInitialProps) {
		Auth.getInitialProps = Component.getInitialProps;
	}

	return Auth;
};

export default withAuth;
