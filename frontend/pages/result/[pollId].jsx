import React, { useState, useEffect, useRef } from "react"

import CssBaseline from "@mui/material/CssBaseline"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import { createTheme, ThemeProvider } from "@mui/material/styles"

import ButtonAppBar from "../../components/buttonAppBar"
import FooterNav from "../../components/footerNav"
import axios from "axios"
import Description from "../../components/result/description"
import MapOption from "../../components/result/mapOption"
import InfoBox from "../../components/result/infoBox"
import { useRouter } from "next/router"
import ApiGateway from "../../apis/ApiGateway"
import ShareBar from "../../components/result/shareBar"
import removeBtn from "../../components/result/revoteBtn"
import RevoteBtn from "../../components/result/revoteBtn"

const theme = createTheme({
    palette: {
        primary: {
            main: "#808080",
        },
    },
    typography: {
        fontFamily: "'Jua', sans-serif",
        //fontFamily: "GmarketSansMedium",
    },
})

export default function Voting() {
    const [selected, setSelected] = useState({})
    const [polls, setPolls] = useState([])
    const [isFetch, setIsFetch] = useState(false)
    const router = useRouter()
    let response
    let { pollId } = router.query
    let isVoted = false

    if (pollId !== undefined && pollId.includes("&")) {
        pollId = pollId.split("&")[0]
        isVoted = true
    }

    const getData = async () => {
        response = await ApiGateway.getPoll(pollId)
        console.log("반드시쳌,", response)
        setPolls(response.data)
    }

    const readCount = async () => {
        response = await ApiGateway.readCount(pollId)
    }

    const chosenItems = async () => {
        const token = getToken()
        if (token === null) return
        response = await ApiGateway.chosenItem(router.query.pollId, token)
        console.log(response.data)
        setSelected(response.data)
    }

    useEffect(async () => {
        if (pollId) {
            await getData()
            readCount()
            chosenItems()
            setIsFetch(true)
        }
    }, [pollId])

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 7,
                        marginBottom: 7,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "left",
                        justifyContent: "center",
                        height: "83vh",
                    }}
                >
                    <Box className="header">
                        <ButtonAppBar titletext={"Result"} />
                    </Box>
                    <Box
                        className="body"
                        flex="1"
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        {isFetch && (
                            <>
                                <Description data={polls} />
                                <InfoBox data={polls.totalVoteCount} />
                                <Box display={"flex"} flexDirection={"column"} flex={"1"}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            flex: 1,
                                            //justifyContent: "center",
                                        }}
                                    >
                                        <MapOption data={polls} selected={selected} />
                                        {isVoted === true && (
                                            <>
                                                <RevoteBtn />
                                            </>
                                        )}

                                        <ShareBar data={polls} />
                                    </Box>
                                </Box>
                            </>
                        )}
                    </Box>

                    <Box className="footer">
                        <FooterNav />
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}
function getToken() {
    const token = localStorage.getItem("accessToken")

    if (token === null) return null

    return token
}
