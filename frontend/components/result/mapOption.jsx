import React, { useState, useEffect } from "react"
import Option from "./option"

const MapOption = (props) => {
    console.log("ㅍㄽ", props)
    const data = props.data.data.items
    const voted = props.voted

    if (!data) return <></>

    /*
  // 정렬
  data.sort((a, b) => {
    return b.voters.length - a.voters.length;
  });
  */

    return data.map((el, index) => <Option data={el} voted={voted} totalVoteCount={props.data.totalVoteCount} />)
}

export default MapOption
