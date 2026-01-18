// ニュースタイトル

type Props = {
  title: string
  // estimatedDuration: number
}

export default function NewsHeader({ title }: Props) {
  // const minutes = Math.ceil(estimatedDuration / 60)

  return (
    <div className="overflow-scroll relative">
      <div className="inline-block whitespace-nowrap">
        <h1 className="text-lg font-semibold text-white-soft">
          {title}
          <span className="">{title}</span>  {/* ここで間隔を広げる */}
        </h1>
      </div>
    </div>
  )
}