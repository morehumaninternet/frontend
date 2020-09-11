export default function hasParent(possibleChild: HTMLElement, possibleParent: HTMLElement | string): boolean {
  let test: null | HTMLElement = possibleChild // tslint:disable-line:no-let

  while (test) {
    if (typeof possibleParent === 'string') {
      if (test.matches(possibleParent)) return true
    } else {
      if (test === possibleParent) return true
    }

    test = test.parentElement // tslint:disable-line:no-expression-statement
  }

  return false
}
