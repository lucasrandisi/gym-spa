import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { useEffect } from "react";

const NavigationScroll = ({ children }: any) => {
	const { pathname } = useRouter();

	useEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
	}, [pathname]);

	return children ?? null;
};

NavigationScroll.propTypes = {
	children: PropTypes.node.isRequired,
};

export default NavigationScroll;
