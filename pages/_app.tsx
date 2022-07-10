import "../styles/globals.css";
import type { AppProps } from "next/app";
import theme from "styles/theme";
import { ThemeProvider } from "@mui/material/styles";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import { AuthProvider } from "security/auth.context";
import Head from "next/head";

type NextPageWithLayout = NextPage & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
	const getLayout = Component.getLayout ?? (page => page);

    return (
        <>
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width"/>
            </Head>
            <AuthProvider>
                <ThemeProvider theme={theme}>
                    {getLayout(<Component {...pageProps} />)}
                </ThemeProvider>
            </AuthProvider>
        </>
	);
}

export default MyApp;
