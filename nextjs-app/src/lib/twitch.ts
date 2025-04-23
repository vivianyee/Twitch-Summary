import fetch from "node-fetch";

const CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET;

type twitchMetadataType = { data: { url: string }[] };
type twitchOauthType = { access_token: string[] };

export async function getTwitchAccessToken() {
  if (!CLIENT_ID || !CLIENT_SECRET) {
    return;
  }

  const tokenRes = await fetch("https://id.twitch.tv/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: CLIENT_ID!,
      client_secret: CLIENT_SECRET!,
      grant_type: "client_credentials",
    }),
  });

  const TOKEN_CONST = await tokenRes.json();
  const OAUTH_TOKEN = TOKEN_CONST as twitchOauthType;

  return typeof OAUTH_TOKEN.access_token === "string"
    ? OAUTH_TOKEN.access_token
    : OAUTH_TOKEN.access_token?.[0];
}

export async function getTwitchVOD(videoId: string, oauthToken: string) {
  if (!CLIENT_ID) {
    return;
  }

  const response = await fetch(
    `https://api.twitch.tv/helix/videos?id=${videoId}`,
    {
      headers: {
        "Client-ID": CLIENT_ID,
        Authorization: `Bearer ${oauthToken}`,
      },
    }
  );

  if (!response.ok) {
    return;
  }

  const data = await response.json();

  if (!data) {
    return;
  }

  const VODMetadata = data as twitchMetadataType;

  return VODMetadata.data[0]; // VOD metadata
}

export async function downloadVOD(vodUrl: string) {
  const response = await fetch(`https://localhost:3000/download`, {
    method: "POST",
    body: JSON.stringify({
      url: vodUrl,
    }),
  });

  if (!response.ok) {
    return;
  }

  const data = await response.json();

  if (!data) {
    return;
  }

  return data;
}
