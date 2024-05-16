import * as React from "react"
import PropTypes from "prop-types"
import Head from "next/head"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { CacheProvider } from "@emotion/react"
import theme from "../src/theme"
import createEmotionCache from "../src/createEmotionCache"
import dotenv from "dotenv"

dotenv.config()

console.log("DB_HOST:", process.env.NEXT_PUBLIC_RUN_MODE)
console.log("DB_USER:", process.env.DB_USER)
console.log("DB_PASS:", process.env.DB_PASS)
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

export default function MyApp(props) {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

    initializeKakaoSDK()

    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
                <meta name="referrer" content="no-referrer" />
                <link rel="shortcut icon" href="/favicon.ico" />
            </Head>
            <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <Component {...pageProps} />
            </ThemeProvider>
        </CacheProvider>
    )
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    emotionCache: PropTypes.object,
    pageProps: PropTypes.object.isRequired,
}

function initializeKakaoSDK() {
    if (typeof window !== "undefined") {
        if (window.Kakao.isInitialized()) {
            return
        }

        window.Kakao.init("f7429e5a7e3c46efd999ac63b58ec9f1")
    }
}
