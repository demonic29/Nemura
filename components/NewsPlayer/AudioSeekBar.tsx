// シークバー

type Props = {
  duration: number
  current: number
  onSeek: (time: number) => void
}

function formatTime(sec: number) {
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${s.toString().padStart(2, "0")}`
}

export default function AudioSeekBar({
  duration,
  current,
  onSeek,
}: Props) {
  const progress = duration === 0 ? 0 : (current / duration) * 100

  return (
    <div className="w-full space-y-1">
    
      {/* シークバー */}
      <div className="relative h-1 w-full bg-white/30 rounded-full group">
        <div
          className="absolute h-full bg-white-soft rounded-full transition-all"
          style={{ width: `${progress}%` }}
        />

        <div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white-soft rounded-full shadow-lg"
          style={{ left: `calc(${progress}% - 6px)` }}
        />

        <input
          type="range"
          min={0}
          max={duration}
          value={current}
          onChange={(e) => onSeek(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>

      {/* 時間表示 */}
      <div className="flex justify-between text-xs text-white/60 font-medium tracking-wider">
        <span>{formatTime(current)}</span>
        <span>{formatTime(duration)}</span>
      </div>

    </div>
  )
}