'use client'

import { useState } from "react";
import { useUploadTwitchLink } from "./hooks/useUploadTwitchLink"

export const TwitchInputLink = () => {
    const { onClickUploadTwitchLink } = useUploadTwitchLink();
    const [videoId, setVideoId] = useState('')

    return <div>
        Upload twitch link to clip: {' '}
        <input type="text" onChange={(e) => { setVideoId(e.target.value) }}></input>
        <button onClick={() => onClickUploadTwitchLink(videoId)}>submit</button>
    </div>
}