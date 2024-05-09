import React, { useState, useEffect } from "react"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Options from "./options"
import { useRouter } from "next/router"
import ApiGateway from "./../../apis/ApiGateway"

export default function TopTenPoll(props) {
    const router = useRouter()
    const handleClick = async () => {
        if (props.unclickable === true) return
        if (today > date) {
            router.push(`/result/${props.data.id}`)
            return
        }

        const token = localStorage.getItem("accessToken")
        if (token === null) router.push(`/polls/${props.data.id}`)
        const payload = { pollHashId: props.data.id }
        const response = await ApiGateway.isVoted(payload, token)
        {
            response.data
                ? router.push(`/result/${props.data.id}&isVoted=true`)
                : router.push(`/polls/${props.data.id}`)
        }
    }
    const OptionsMap = () => {
        const data = props.data.options
        return data.map((el) => <Options data={el} />)
    }

    const date = new Date(props.data.endAt)
    const strDate = date.toISOString().substring(0, 10).split("-")

    const today = new Date()

    return (
        <Box
            sx={{
                display: "flex",
                height: "140px",
                width: "300px",
                mr: 1,
                ml: 0.5,
                boxShadow: "0 0 5px 1px rgba(0,0,0,0.095)",
                //border: 1,
                borderColor: "lightgray",
                borderRadius: 2,
                flexShrink: 0,
                flexDirection: "column",
                //alignItems: "flex-end",
                mt: 0.8,
                cursor: "pointer",
            }}
            onClick={handleClick}
        >
            <Box
                sx={{
                    display: "flex",
                    width: "100%",
                    height: "70px",
                    alignItems: "center",
                    pl: 1.5,
                    flex: 3,
                }}
            >
                <Box
                    backgroundColor={today < date ? "#E8F4E7" : "rgb(251,239,236)"}
                    sx={{
                        mt: 2,
                        display: "flex",
                        width: "50px",
                        height: "23px",
                        alignItems: "center",
                        justifyContent: "center",
                        ml: 0.5,
                        borderRadius: 0.5,
                    }}
                >
                    {today < date ? (
                        <Typography sx={{ fontSize: 12, letterSpacing: 0, color: "rgb(74,142,78)" }}>
                            진행 중
                        </Typography>
                    ) : (
                        <Typography sx={{ fontSize: 12, letterSpacing: 0, color: "rgb(213,82,49)" }}>종료</Typography>
                    )}
                </Box>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    width: "100%",
                    height: "70px",
                    pt: 1,
                    pl: 1.9,
                    flex: 5,
                    // backgroundColor: "cyan",
                    letterSpacing: 0,
                }}
            >
                {props.data.title}
            </Box>
            <Box
                sx={{
                    display: "flex",
                    width: "100%",
                    height: "80px",
                    borderRadius: 3,
                    borderTopRightRadius: 0,
                    borderTopLeftRadius: 0,
                    flex: 3,
                    // backgroundColor: "tan",
                }}
            >
                <Typography sx={{ fontSize: 12, letterSpacing: 0, pl: 1.5, pt: 0.6, color: "rgb(192, 192, 192)" }}>
                    {strDate[1] + "월 " + strDate[2] + "일 종료 · " + props.data.totalVotingCount + "명 참여"}
                </Typography>
            </Box>
        </Box>
    )
}
