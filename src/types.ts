type Maybe<T> = null | undefined | T

type PageProps = {
  location: Location
  navigate(href: string): void
}

type TeamMember = {
  name: string
  title: string
  image_file_name: string
  background_color: string
  background_shape: 'square' | 'circle'
}

type Availability = 'signup' | 'volunteer'
type ThankYouFor = 'feedback' | Availability

type Link = {
  href: string
  ariaLabel: string
  icon: JSX.Element
}

type SEOLinks = ReadonlyArray<React.DetailedHTMLProps<React.LinkHTMLAttributes<HTMLLinkElement>, HTMLLinkElement>>


