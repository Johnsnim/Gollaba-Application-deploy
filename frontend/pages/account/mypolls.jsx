import CssBaseline from "@mui/material/CssBaseline"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useState } from "react"
import ButtonAppBar from "../../components/buttonAppBar"
import FooterNav from "../../components/footerNav"
import PollsMap from "../../components/polls/mapPoll"
import { useInView } from "react-intersection-observer"
import theme from "../../src/theme"
import axios from "axios"
import { useEffect } from "react"
import PollsMapFavorite from "../../components/account/mapPollFavorite"
import ApiGateway from "../../apis/ApiGateway"
import { useCookies } from "react-cookie"
import jwt_decode from "jwt-decode"

const PollTheme = createTheme(theme)

export default function Mypolls(props) {
    let response
    const [polls, setPolls] = useState([])
    const [ref, inView] = useInView()
    const [isLoading, setIsLoading] = useState(false)
    const [offset, setOffset] = useState(0)

    const limit = 10
    const [totalCount, setTotalCount] = useState(0)
    const [reachMaxPoll, setReachMaxPoll] = useState(false)
    let token

    const getData = async () => {
        if (reachMaxPoll === true) return
        setIsLoading(true)
        response = await ApiGateway.getMyPolls(offset, limit, token)
        if (response.status !== "SUCCESS") {
            setReachMaxPoll(true)
            return
        }
        console.log("zjstjf", response)
        setPolls([...polls, ...response.data.items])
        setTotalCount(response.totalCount)
        setIsLoading(false)
    }

    useEffect(() => {
        token = getToken()
        getData()
    }, [offset])

    useEffect(() => {
        if (inView && !isLoading) {
            setOffset((prevState) => prevState + 1)
        }
    }, [inView, isLoading])

    if (polls !== undefined)
        return (
            <>
                <ThemeProvider theme={theme}>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <Box
                            sx={{
                                marginTop: 8,
                                marginBottom: 10,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "left",
                                justifyContent: "center",
                            }}
                        >
                            <div className="header">
                                <ButtonAppBar titletext={"My Polls"} />
                            </div>

                            <div className="body" flex="1">
                                <PollsMapFavorite data={polls} />
                                <Box ref={ref} />
                            </div>
                            <div className="footer">
                                <FooterNav />
                            </div>
                        </Box>
                    </Container>
                </ThemeProvider>
            </>
        )
}

function getToken() {
    const token = localStorage.getItem("accessToken")

    if (token === null) return null

    const { exp } = jwt_decode(token)
    const expiredDate = new Date(exp * 1000)
    const now = new Date()

    if (expiredDate < now) return null

    return token
}
