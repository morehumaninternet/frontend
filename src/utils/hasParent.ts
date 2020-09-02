export default function hasParent(
  possibleChild: HTMLElement,
  possibleParent: HTMLElement
): boolean {
  let test: null | HTMLElement = possibleChild // tslint:disable-line:no-let

  while (test) {
    if (test === possibleParent) return true
    test = test.parentElement // tslint:disable-line:no-expression-statement
  }

  return false
}
