// tslint:disable:no-expression-statement no-let
import numPixels from '../../../utils/numPixels'

function* getSelectionClientRects(
  editorElement: any
): IterableIterator<{
  top: number
  bottom: number
  left: number
  right: number
}> {
  const [selectionStart, selectionEnd] = editorElement.editor.getSelectedRange()
  if (selectionStart === selectionEnd) return

  let selectionCharacter = selectionStart

  while (selectionCharacter < selectionEnd) {
    const rect = editorElement.editor.getClientRectAtPosition(selectionCharacter)
    selectionCharacter++
    if (rect) yield rect
  }
}

export function getTopSelectedRow(editorElement: any): null | { top: number; left: number; right: number } {
  let startingRect
  let lastRectSameRow

  for (const testRect of getSelectionClientRects(editorElement)) {
    if (!startingRect) {
      startingRect = testRect
      lastRectSameRow = testRect
      continue
    }
    if (testRect.top !== startingRect.top) {
      break
    }

    lastRectSameRow = testRect
  }

  if (!startingRect) return null
  if (!lastRectSameRow) throw new Error('lastRectSameRow not found')
  if (startingRect.top !== lastRectSameRow.top) throw new Error('found rectangles on different rows')

  return {
    top: startingRect.top,
    left: startingRect.left,
    right: lastRectSameRow.right,
  }
}

export default function updateTopSelectedRow(
  issueBodyRef: React.MutableRefObject<HTMLDivElement>,
  topSelectedRow: null | { top: number; left: number; right: number }
): void {
  const toolbarElement = issueBodyRef.current!.querySelector('trix-toolbar') as any

  if (!topSelectedRow) {
    toolbarElement.style.display = 'none'
  } else {
    toolbarElement.style.display = 'block' // this has to go first so that the .trix-button-group is on the page so that its height & width can be measured

    const toolbarButtonGroup = toolbarElement.querySelector('.trix-button-row > .trix-button-group')!
    const heightPixels = numPixels(toolbarButtonGroup, 'height')
    const widthPixels = numPixels(toolbarButtonGroup, 'width')
    const midpoint = (topSelectedRow.left + topSelectedRow.right) / 2

    toolbarElement.style.top = `${topSelectedRow.top - heightPixels - 10}px`
    toolbarElement.style.left = `${midpoint - widthPixels / 2}px`
  }
}
