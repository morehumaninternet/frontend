import { useIntl } from 'react-intl'

export function getLocalePrefix(): string {
  const { locale } = useIntl()
  return locale === 'en' ? '' : `/${locale}`
}

function href(pathname: string): string {
  return `/${pathname}`
}

export const thankYouHref = () => href('thank-you')

export const issueHref = ({ site, id }: { site: string; id: number }) => href(`issue?site=${site}&id=${id}`)

export const issuesHref = ({ site }: { site: string }) => href(`issues?site=${site}`)
