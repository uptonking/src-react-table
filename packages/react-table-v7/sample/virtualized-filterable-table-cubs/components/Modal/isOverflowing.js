import isWindow from 'dom-helpers/isWindow';
import ownerDocument from '../../utils/ownerDocument';
import ownerWindow from '../../utils/ownerWindow';

export function isBody(node) {
  return node && node.tagName.toLowerCase() === 'body';
}

// Do we have a vertical scroll bar?
export default function isOverflowing(container) {
  const doc = ownerDocument(container);
  const win = ownerWindow(doc);

  if (!isWindow(doc) && !isBody(container)) {
    return container.scrollHeight > container.clientHeight;
  }

  // Takes in account potential non zero margin on the body.
  const style = win.getComputedStyle(doc.body);
  const marginLeft = parseInt(style.getPropertyValue('margin-left'), 10);
  const marginRight = parseInt(style.getPropertyValue('margin-right'), 10);

  return marginLeft + doc.body.clientWidth + marginRight < win.innerWidth;
}
