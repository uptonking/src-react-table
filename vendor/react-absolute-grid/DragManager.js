/** grid容器的全局拖拽配置，主要处理drag start/move/end事件 */
export default class DragManager {
  dragItem;
  /** 拖拽开始时，e.pageX - (rect.left + window.pageXOffset)  */
  initialMouseX;
  initialMouseY;
  /** e.pageX */
  initialEventX;
  initialEventY;
  /** x方向拖动的距离 */
  dragX;
  dragY;
  keyProp;

  constructor(moveFn, dragStartFn, dragEndFn, dragMoveFn, keyProp) {
    this.dragMove = this.dragMove.bind(this);
    this.endDrag = this.endDrag.bind(this);
    /** 移动时会执行的方法，主要更新原数组数据 */
    this.moveFn = moveFn;

    // 下面3个拖动处理方法都是非必须的
    this.dragStartFn = dragStartFn;
    this.dragEndFn = dragEndFn;
    this.dragMoveFn = dragMoveFn;
    this.keyProp = keyProp;
  }

  /** 移动单元格内容时，会更新计算移动距离，更新原数组数据 */
  dragMove(e) {
    const tolerance = 3;
    const isTouch = e.touches && e.touches.length;
    const pageX = isTouch ? e.touches[0].pageX : e.pageX;
    const pageY = isTouch ? e.touches[0].pageY : e.pageY;

    const xMovement = Math.abs(this.initialEventX - pageX);
    const yMovement = Math.abs(this.initialEventY - pageY);

    // 若拖动距离大于3px
    if (xMovement > tolerance || yMovement > tolerance) {
      const clientX = isTouch ? e.touches[0].clientX : e.clientX;
      const clientY = isTouch ? e.touches[0].clientY : e.clientY;

      this.dragX = clientX - this.initialMouseX;
      this.dragY = clientY - this.initialMouseY;

      // update方法由BaseDisplayObject传过来，更新拖拽距离，
      // 会触发BaseDisplayObject重渲染，重新计算拖拽样式
      this.update(this.dragX, this.dragY);

      let targetKey;
      // 获取鼠标点新位置处的单元格元素，通过data-key属性获取单元格对应的原数组数据的属性
      let targetElement = document.elementFromPoint(clientX, clientY);
      while (targetElement.parentNode) {
        if (targetElement.getAttribute('data-key')) {
          targetKey = targetElement.getAttribute('data-key');
          break;
        }
        targetElement = targetElement.parentNode;
      }

      console.log('targetElement, ', targetElement);

      // 若拖动到的目标位置存在，且与拖拽起点位置不同，则通过传入的moveFn更新拖动后的数据
      if (targetKey && targetKey !== this.dragItem[this.keyProp]) {
        this.moveFn(this.dragItem[this.keyProp], targetKey);
      }

      e.stopPropagation();
      e.preventDefault();
    }

    this.dragMoveFn(e);
  }

  /** 结束拖动时，清空拖拽item */
  endDrag() {
    document.removeEventListener('mousemove', this.dragMove);
    document.removeEventListener('mouseup', this.endDrag);

    this.dragItem = null;
    if (this.update && typeof this.update === 'function') {
      this.update(null, null);
    }
    this.update = null;

    this.dragEndFn();
  }

  /** 开始拖动时，计算初始位置，这里添加mousemove的监听器 */
  startDrag(e, domNode, item, fnUpdate) {
    console.log('startDrag, ', item);
    const isTouch = e.targetTouches && e.targetTouches.length === 1;
    console.log('e.button === 0 || isTouch, ', e.button === 0 || isTouch);

    // 若拖拽事件由左键单击或触摸触发
    if (e.button === 0 || isTouch) {
      const rect = domNode.getBoundingClientRect();

      this.update = fnUpdate;
      this.dragItem = item;
      const pageX = isTouch ? e.targetTouches[0].pageX : e.pageX;
      const pageY = isTouch ? e.targetTouches[0].pageY : e.pageY;

      this.initialMouseX = Math.round(pageX - (rect.left + window.pageXOffset));
      this.initialMouseY = Math.round(pageY - (rect.top + window.pageYOffset));
      this.initialEventX = pageX;
      this.initialEventY = pageY;

      console.log(
        'initialMouseXY-initialEventXY',
        this.initialMouseX,
        this.initialMouseY,
        this.initialEventX,
        this.initialEventY,
      );

      document.addEventListener('mousemove', this.dragMove);
      document.addEventListener('touchmove', this.dragMove);
      document.addEventListener('mouseup', this.endDrag);
      document.addEventListener('touchend', this.endDrag);
      document.addEventListener('touchcancel', this.endDrag);

      // This is needed to stop text selection in most browsers
      e.preventDefault();
    }

    this.dragStartFn(e);
  }

  /** 计算单元格拖动时的样式 */
  getStyle(x, y) {
    const dragStyle = {};
    const transform = `translate3d(${x}px, ${y}px, 0)`;
    // Makes positioning simpler if we're fixed
    dragStyle.position = 'fixed';
    dragStyle.zIndex = 1000;
    // Required for Fixed positioning
    dragStyle.left = 0;
    dragStyle.top = 0;
    dragStyle.WebkitTransform = transform;
    dragStyle.MozTransform = transform;
    dragStyle.msTransform = transform;
    dragStyle.transform = transform;

    // Turn off animations for this item
    dragStyle.WebkitTransition = 'none';
    dragStyle.MozTransition = 'none';
    dragStyle.msTransition = 'none';
    dragStyle.transition = 'none';

    // Allows mouseover to work
    dragStyle.pointerEvents = 'none';

    return dragStyle;
  }
}
