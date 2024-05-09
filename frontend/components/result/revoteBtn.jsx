import React, { useEffect, useState } from "react"
import Box from "@mui/material/Box"
import { Checkbox, TextField } from "@mui/material"
import { ConstructionOutlined } from "@mui/icons-material"
import defaultImage from "../../public/defaultImage.png"
import { useRouter } from "next/router"

const label = { inputProps: { "aria-label": "Checkbox demo" } }
export default function RevoteBtn(props) {
    const router = useRouter()
    let { pollId } = router.query
    pollId = pollId.split("&")[0]

    console.log("체크하", pollId)
    const btnClick = () => {
        router.push(`/polls/${pollId}&isVoted=true`)
    }
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                justifyContent: "flex-end",
            }}
        >
            <Box
                className="outerContainer"
                onClick={btnClick}
                sx={{
                    // maxWidth: "80%",
                    height: 50,
                    mt: 1,
                    mb: 1,
                    mr: 1,
                    padding: 1,
                    borderRadius: "5px",
                    boxShadow: 3,
                    letterSpacing: 1.2,
                    display: "flex",
                    borderColor: "grey.500",
                    flexDirection: "row",
                    alignItems: "center",
                    fontSize: 22,
                    backgroundColor: "white",
                    cursor: "grab",
                }}
            >
                다시 투표하기
            </Box>
        </Box>
    )
}
