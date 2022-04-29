function href(pathname: string): string {
  return `/${pathname}`
}

export const thankYouHref = (thankYouFor: ThankYouFor) => href(`thank-you-${thankYouFor}`)
