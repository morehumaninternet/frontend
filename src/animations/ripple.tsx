// tslint:disable:no-expression-statement

// Adds a div.ripple element to the page, centered on whatever element was passed in,
// then removes the element after the animation completes.
// See src/styles/animations/ripple.scss
export default function drawRipple(element: Element): void {
  const { top, bottom, left, right } = element.getBoundingClientRect()
  const centerX = (left + right) / 2
  const centerY = (top + bottom) / 2

  const ripple = document.createElement('div')
  ripple.classList.add('ripple')
  ripple.style.left = `${centerX - 5}px` // the ripple has a 10px diameter
  ripple.style.top = `${centerY - 5}px` // the ripple has a 10px diameter

  document.body.appendChild(ripple)
  setTimeout(() => {
    document.body.removeChild(ripple)
  }, 1000)
}
