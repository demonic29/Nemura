// lib/voicevox.ts
import axios from "axios"

const VOICEVOX_URL = "http://127.0.0.1:50021"

export async function generateVoice(text: string) {
    const query = await axios.post(
        `${VOICEVOX_URL}/audio_query`,
        null,
        { params: { speaker: 42, text } }
    )

    const synthesis = await axios.post(
        `${VOICEVOX_URL}/synthesis`,
        query.data,
        {
        params: { speaker: 42 },
        responseType: "arraybuffer"
        }
    )

    return Buffer.from(synthesis.data)
}
