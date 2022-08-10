import React from "react";
import { useRouter } from "next/router";
import FullPageLoader from "components/FullPageLoader";
import { useAuth } from "./auth.context";

const Auth = ({ children }: { children: any }) => {
	const router = useRouter();
	const { isAuthenticated, isLoading, user } = useAuth();
	const { isProtected, userTypes } = children.props;

	if (!isProtected) {
		return children;
	}

	if (!isLoading && !isAuthenticated) {
		router.push("/login");
	}

	if (isLoading || !isAuthenticated || !user) {
		return <FullPageLoader />;
	}

	if (
		isProtected &&
		userTypes &&
		isAuthenticated &&
		user?.roles &&
		userTypes.indexOf(user.roles[0].name.toLowerCase()) === -1
	) {
		return <p>Sorry, you dont have access</p>;
	}

	return children;
};

export default Auth;
