import React from "react";
import { useRouter } from "next/router";
import FullPageLoader from "components/FullPageLoader";
import { useAuth } from "./auth.context";

const withAuth = <P extends object>(Component: React.ComponentType<P>) => {
	const Redirect = (props: P) => {
		const router = useRouter();
		const { isAuthenticated, isLoading } = useAuth();

		if (!isLoading && !isAuthenticated) {
			router.push("/login");
		}

		if (isLoading || !isAuthenticated) {
			return <FullPageLoader />;
		}

		// eslint-disable-next-line react/jsx-props-no-spreading
		return <Component {...props} />;
	};
	return Redirect;
};

export default withAuth;
