import { openai } from "./openai";

export async function summarizeVODTranscript(transcript: string) {
    const prompt = `
      Here is the transcript of a Twitch stream from the streamer xxx. 
      Take note of all the activities and games that the streamer is doing or playing.
      From that, output an array of objects containing timestamps forming clips that are highlights.
      The highlights should be events that are important to the context of what the streamer is doing.
      The duration of the clips watched together should add up to at most thirty minutes long.

      Transcript:
      ${transcript.slice(0, 4000)}  // Limit to token size
    `;

    const res = await openai.chat.completions.create({
        model: 'gpt-4-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
    });

    return res.choices[0].message.content;
}
