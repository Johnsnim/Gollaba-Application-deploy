import React, { useState } from "react"
import axios from "axios"
import Box from "@mui/material/Box"
import { Checkbox, TextField } from "@mui/material"
import { CookiesProvider, useCookies } from "react-cookie"
import jwt_decode from "jwt-decode"
import ApiGateway from "../../apis/ApiGateway"
import { useRouter } from "next/router"

const label = { inputProps: { "aria-label": "Checkbox demo" } }

export default function CreateBtn(props) {
    console.log(props)
    const router = useRouter()
    const [nickname, setNickname] = useState("")

    console.log("라우터", router.query.pollId)
    const nicknameChanged = (event) => {
        setNickname(event.target.value)
    }

    const btnClicked = async () => {
        const token = getToken()
        const { uid } = jwt_decode(token)

        const payload = {
            pollId: router.query.pollId,
            pollItemIds: props.voted,
            userId: uid,
            voterName: nickname.length !== 0 ? nickname : "익명",
        }

        const response = await ApiGateway.vote(payload, token)
        if (response?.error) {
            alert(response.message)
            if (response.code === 20004) {
                // router.push("/result/" + props.pollId)
            }
            return
        }
        router.push("/result/" + props.pollId)
    }

    return (
        <Box
            sx={{
                maxWidth: "100%",
                pr: 1,
                mb: -1,
                maxHeight: 1,
                bottom: 60,
                display: "flex",
                flexDirection: "row",
            }}
        >
            <Box
                className="nickname"
                sx={{
                    flex: 3,
                    pr: 3,
                    pt: 2,
                }}
            >
                {props.isBallot ? (
                    <></>
                ) : (
                    <TextField label="닉네임" variant="outlined" size="small" onChange={nicknameChanged} />
                )}
            </Box>
            <Box
                className="button"
                component={"button"}
                onClick={btnClicked}
                sx={{
                    flex: 2,
                    maxWidth: "100%",
                    height: 40,
                    mt: 2,
                    mb: 2,
                    padding: 1,
                    border: 1,
                    borderRadius: "5px",
                    padding: 0.5,
                    boxShadow: 2,
                    display: "flex",
                    border: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    fontSize: 15,
                    border: "none",
                }}
            >
                투표하기
            </Box>
        </Box>
    )
}

function getToken() {
    const token = localStorage.getItem("accessToken")

    if (token === null) return null

    return token
}
