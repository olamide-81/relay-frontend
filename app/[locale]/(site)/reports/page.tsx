import { permanentRedirect } from 'next/navigation'

type Props = { params: Promise<{ locale: string }> }

/** Reports are listed under Intelligence › Latest reports. */
export default async function Page({ params }: Props) {
  const { locale } = await params
  permanentRedirect(`/${locale}/intelligence#latest-reports`)
}
