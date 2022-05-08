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
