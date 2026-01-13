// ニュースタイトル

type Props = {
  title: string
  estimatedDuration: number
}

export default function NewsHeader({ title, estimatedDuration }: Props) {
  const minutes = Math.ceil(estimatedDuration / 60)

  return (
    <div className="px-8 overflow-hidden relative">
      <div className="inline-block whitespace-nowrap animate-marquee">
        <h1 className="text-lg font-semibold text-white-soft">
          {title}
          <span className="mx-12">{title}</span>  {/* ここで間隔を広げる */}
        </h1>
      </div>
    </div>
  )
}