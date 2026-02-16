import { NextRequest } from 'next/server'
import axios from 'axios'

export async function POST(req: NextRequest) {
  try {
    const { text, speaker = 42 } = await req.json()

    const responseQuery = await axios.post(
      `${process.env.VOICEVOX_URL}/audio_query`,
      null,
      { params: { speaker, text } }
    )

    const query = responseQuery.data

    const responseSynthesis = await axios.post(
      `${process.env.VOICEVOX_URL}/synthesis`,
      query,
      {
        params: { speaker },
        responseType: 'arraybuffer',
      }
    )

    return new Response(responseSynthesis.data, {
      headers: {
        "Content-Type": "audio/wav",
      },
    })

  } catch (error) {
    console.log('error', error)
    return new Response("Error generating audio", { status: 500 })
  }
}
