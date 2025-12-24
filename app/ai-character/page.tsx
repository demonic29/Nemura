'use client';
import React, { useState } from 'react'
import { Characters } from './config';
import CharacterSelect from './CharacterSelect';
import axios from 'axios';

export default function Character() {

    const [character, setCharacter] = useState(Characters[0]);
    // 音声再生
    const playAudio = async (text: string, speaker: string) => {
    try {
        // 音声取得
        const responseAudio = await axios.post('/api/audio', {
        text,
        speaker,
        })

        // Base64形式で取得
        const base64Audio = responseAudio?.data?.response
        // Bufferに変換
        const byteArray = Buffer.from(base64Audio, 'base64')
        // Blobに変換
        const audioBlob = new Blob([byteArray], { type: 'audio/x-wav' })
        // URLに変換
        const audioUrl = URL.createObjectURL(audioBlob)
        // 音声作成
        const audio = new Audio(audioUrl)
        // 音量[0-1]設定
        audio.volume = 1
        // 再生
        audio.play()
    } catch (e) {
        console.error(e)
    }
    }
    
    return (
        <div>
            <CharacterSelect setCharacter={setCharacter} playAudio={playAudio}/>
        </div>
    )
}
