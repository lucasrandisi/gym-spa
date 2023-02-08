/* eslint-disable react/jsx-props-no-spreading */
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { theme } from "styles/theme";
import { ThemeProvider } from "@mui/material/styles";
import { NextPage } from "next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProvider } from "security/auth.context";
import Head from "next/head";
import Auth from "security/auth";
import { SnackbarProvider } from "notistack";
import NavigationScroll from "components/auth-layout/NavigationScroll";

type NextPageWithLayout = NextPage & {
	// eslint-disable-next-line no-unused-vars
	getLayout?: (page: any) => any;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
	const getLayout = Component.getLayout ?? (page => page);

	const customization = null;

	return (
		<>
			<Head>
				<meta name="viewport" content="initial-scale=1, width=device-width" />
			</Head>
			<QueryClientProvider client={queryClient}>
				<ReactQueryDevtools initialIsOpen={false} />
				<AuthProvider>
					<ThemeProvider theme={theme(customization)}>
						<NavigationScroll>
							<SnackbarProvider
								maxSnack={3}
								autoHideDuration={5000}
								anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
								{getLayout(
									<Auth>
										<Component {...pageProps} />
									</Auth>
								)}
							</SnackbarProvider>
						</NavigationScroll>
					</ThemeProvider>
				</AuthProvider>
			</QueryClientProvider>
		</>
	);
}

export default MyApp;
