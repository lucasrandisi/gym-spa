import "../styles/globals.css";
import type { AppProps } from "next/app";
import theme from "styles/theme";
import { ThemeProvider } from "@mui/material/styles";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page);

    return (
        <ThemeProvider theme={theme}>
            {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
    );
}

export default MyApp;
