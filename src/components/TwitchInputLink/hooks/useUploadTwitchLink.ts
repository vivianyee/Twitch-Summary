import { downloadVOD } from "@/lib/twitch";

export const useUploadTwitchLink = () => {
    const onClickUploadTwitchLink = async (videoId: string) => {
        const res = await fetch(`/api/getTwitchData?videoId=987654321`)

        const { vodData } = await res.json();
        console.log(vodData)

        return vodData
    }

    return { onClickUploadTwitchLink }
}