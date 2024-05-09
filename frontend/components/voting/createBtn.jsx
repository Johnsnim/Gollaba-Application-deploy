import React, { useState } from "react"
import axios from "axios"
import Box from "@mui/material/Box"
import { Checkbox, TextField } from "@mui/material"
import { CookiesProvider, useCookies } from "react-cookie"
import jwt_decode from "jwt-decode"
import ApiGateway from "../../apis/ApiGateway"
import { useRouter } from "next/router"
import Modal from "@mui/material/Modal"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"

const label = { inputProps: { "aria-label": "Checkbox demo" } }

export default function CreateBtn(props) {
    const router = useRouter()
    const [nickname, setNickname] = useState("")
    const [handleModalOpen, setHandleModalOpen] = useState(false)

    const nicknameChanged = (event) => {
        setNickname(event.target.value)
    }

    let { pollId } = router.query

    const btnClicked = async () => {
        const token = getToken()
        const uid = token !== null ? jwt_decode(token).uid : undefined

        if (pollId !== undefined && pollId.includes("&")) {
            pollId = pollId.split("&")[0]
            const payload = {
                pollItemIds: props.voted,
                voterName: nickname.length !== 0 ? nickname : "익명",
            }
            const isVoted = await ApiGateway.chosenItem(pollId, token)

            console.log("이즈보티드", isVoted)

            const response = await ApiGateway.voteEdit(isVoted.data.id, payload, token)
            console.log("리스폰스", response)
            if (response?.error) {
                alert(response.message)
                if (response.code === 20004) {
                    // router.push("/result/" + props.pollId)
                }
                return
            }
            router.push("/result/" + pollId + "&isVoted=true")
            return
        }

        const payload = {
            pollHashId: router.query.pollId,
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
        router.push("/result/" + props.pollId + "&isVoted=true")
    }

    const yesbtnClicked = async () => {
        const token = getToken()
        const { uid } = jwt_decode(token)

        const payload = {
            pollItemIds: props.voted,
            voterName: nickname.length !== 0 ? nickname : "익명",
        }

        const response = await ApiGateway.voteEdit(router.query.pollId, payload, token)
        if (response?.error) {
            alert(response.message)
            if (response.code === 20004) {
                // router.push("/result/" + props.pollId)
            }
            return
        }
        //router.push("/result/" + props.pollId)
    }

    const NobtnClicked = async () => {
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

            <Modal
                open={handleModalOpen}
                //onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "white",
                        flexDirection: "column",
                        width: 500,
                        height: 250,
                        borderRadius: 3,
                        boxShadow: 10,
                    }}
                >
                    <Typography sx={{ fontSize: 23 }}>⚠️잠깐만요! </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        예전에 투표했던 기록이 있어요. 기존의 투표 내역을 갱신할까요?
                    </Typography>
                    <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
                        <Button variant="contained" onClick={yesbtnClicked}>
                            예, 갱신해주세요.
                        </Button>
                        <Button variant="outlined" onClick={NobtnClicked}>
                            아니오, 기존대로 유지할게요.
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    )
}

function getToken() {
    const token = localStorage.getItem("accessToken")

    if (token === null) return null

    return token
}
