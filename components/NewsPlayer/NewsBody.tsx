// ニュース本文エリア

type Props = {
  body: string
}

export default function NewsBody({ body }: Props) {
  return (
    <div className="px-6 h-[120px] overflow-y-auto text-white-soft">
      <p className="text-[14px] leading-relaxed">
        {body}
      </p>
    </div>
  )
}