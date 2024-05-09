import React, { useState, useEffect } from "react"
import Option from "./option"

const MapOption = (props) => {
    console.log("ㅍㄽ", props)
    const data = props.data.items
    const selected = props.selected

    if (!data) return <></>

    /*
  // 정렬
  data.sort((a, b) => {
    return b.voters.length - a.voters.length;
  });
  */

    return data.map((el, index) => (
        <Option data={el} selected={selected} totalVoteCount={props.data.totalVotingCount} />
    ))
}

export default MapOption
