import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/app/lib/supabase/supabase"

const VOICEVOX_URL = process.env.VOICEVOX_URL || "http://localhost:50021"

export async function POST(req: NextRequest) {
  try {
    const { newsId, title, description, speaker } = await req.json()

    if (!title || !description || !speaker) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const fullText = `${title}。${description}`
    const textHash = hashText(fullText)

    // Check if audio already exists
    const { data: existing } = await supabase
      .from("news_audio_cache")
      .select("audio_url, id")
      .eq("text_hash", textHash)
      .eq("speaker", speaker)
      .single()

    if (existing?.audio_url) {
      return NextResponse.json({
        success: true,
        audioUrl: existing.audio_url,
        cached: true
      })
    }

    // Generate audio
    const audioBuffer = await generateAudioWithVoiceVox(fullText, speaker)
    
    // Upload to Supabase Storage
    const fileName = `${newsId}-${speaker}-${Date.now()}.wav`
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("news-audio")
      .upload(fileName, audioBuffer, {
        contentType: "audio/wav",
        upsert: true
      })

    if (uploadError) throw uploadError

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from("news-audio")
      .getPublicUrl(fileName)

    // Store in cache table
    await supabase
      .from("news_audio_cache")
      .insert({
        news_id: newsId,
        text_hash: textHash,
        speaker: speaker,
        audio_url: publicUrl,
        title: title,
        description: description
      })

    return NextResponse.json({
      success: true,
      audioUrl: publicUrl,
      cached: false
    })

  } catch (error: any) {
    console.error("Error generating audio:", error)
    return NextResponse.json(
      { error: error.message || "Failed to generate audio" },
      { status: 500 }
    )
  }
}

async function generateAudioWithVoiceVox(text: string, speaker: string): Promise<Buffer> {
  // Query audio
  const queryResponse = await fetch(
    `${VOICEVOX_URL}/audio_query?text=${encodeURIComponent(text)}&speaker=${speaker}`,
    { method: "POST" }
  )
  
  if (!queryResponse.ok) {
    throw new Error("Failed to query audio from VoiceVox")
  }

  const audioQuery = await queryResponse.json()

  // Synthesize audio
  const synthesisResponse = await fetch(
    `${VOICEVOX_URL}/synthesis?speaker=${speaker}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(audioQuery)
    }
  )

  if (!synthesisResponse.ok) {
    throw new Error("Failed to synthesize audio from VoiceVox")
  }

  return Buffer.from(await synthesisResponse.arrayBuffer())
}

function hashText(text: string): string {
  let hash = 0
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return Math.abs(hash).toString(36)
}