import { useIntl } from 'react-intl'

function localePrefix(): string {
  const { locale } = useIntl()
  return locale === 'en' ? '' : `/${locale}`
}

function href(pathname: string): string {
  return `${localePrefix()}/${pathname}`
}

export const homeHref = () => href('')

export const demoHref = () => href('demo')

export const thankYouHref = () => href('thank-you')

export const issueHref = ({ site, id }: { site: string; id: number }) => href(`issue?site=${site}&id=${id}`)

export const issuesHref = ({ site }: { site: string }) => href(`issues?site=${site}`)
