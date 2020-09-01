export default function hasParent(
  possibleChild: HTMLElement,
  possibleParent: HTMLElement
) {
  let test: null | HTMLElement = possibleChild

  while (test) {
    if (test === possibleParent) return true
    test = test.parentElement
  }

  return false
}
