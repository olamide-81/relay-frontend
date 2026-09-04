import Image from 'next/image'

type Props = {
  /** Keep the Relay wordmark next to the mark. */
  withName?: boolean
  priority?: boolean
}

/** Same icon as the marketing site, with the Relay name until the rebrand. */
export default function RelayMark({ withName = true, priority = false }: Props) {
  return (
    <>
      <Image
        src="/relaydark.png"
        alt=""
        width={28}
        height={28}
        className="relay-logo-mark"
        priority={priority}
      />
      {withName ? <span className="relay-logo-name">Relay</span> : null}
    </>
  )
}
