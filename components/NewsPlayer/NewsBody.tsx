// ニュース本文エリア

type Props = {
  body: string
}

export default function NewsBody({ body }: Props) {
  return (
    <div className="px-8 h-40 overflow-y-auto text-white-soft">
      <p className="text-base leading-relaxed">
        {body}
      </p>
    </div>
  )
}