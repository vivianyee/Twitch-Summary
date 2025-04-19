import { downloadVOD, getTwitchAccessToken, getTwitchVOD } from "@/lib/twitch";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const videoId = new URL(req.url).searchParams.get('videoId');

    if (!videoId || typeof videoId !== 'string') {
        return NextResponse.json({ error: 'Missing or invalid videoId' }, { status: 400 });
    }

    try {
        const accessToken = await getTwitchAccessToken();

        if (!accessToken) {
            throw new Error("Failed to get twitch access token")
        }

        const vodData = await getTwitchVOD(videoId, accessToken)
        console.log(vodData);
        
        if (!vodData) {
            throw new Error("Failed to get twitch url")
        }

        const x = await downloadVOD(vodData.url)

        return NextResponse.json({ vodData }, { status: 200 });
    } catch (err) {
        console.error('[Twitch VOD API]', err);
        return NextResponse.json({ error: 'Server error' + err }, { status: 500 });
    }
}