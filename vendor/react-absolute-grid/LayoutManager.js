/**
 * 计算grid布局配置，如行高，也可以用来计算单元格的style
 */
export default class LayoutManager {
  columns;
  horizontalMargin;
  verticalMargin;
  layoutWidth;
  itemHeight;
  itemWidth;
  rowHeight;

  /**
   * 创建grid布局对象
   * @param {*} options 每个单元格的配置，包括宽高、缩放比例
   * @param {number} width grid容器宽度
   */
  constructor(options, width) {
    this.update(options, width);
  }

  update(options, width) {
    // Calculates layout
    this.layoutWidth = width;
    this.zoom = options.zoom;
    this.itemWidth = Math.round(options.itemWidth * this.zoom);
    this.itemHeight = Math.round(options.itemHeight * this.zoom);
    // 根据grid容器宽度、单元格宽度计算每行的单元格数量
    this.columns = Math.floor(this.layoutWidth / this.itemWidth);
    // 计算单元格水平间距时，默认第一/最后个单元格挨着容器左/右边框
    this.horizontalMargin =
      this.columns === 1
        ? 0
        : Math.round(this.layoutWidth - this.columns * this.itemWidth) /
          (this.columns - 1);
    // 行间距不计算，直接传过来
    this.verticalMargin =
      options.verticalMargin === -1
        ? this.horizontalMargin
        : options.verticalMargin;
    this.rowHeight = this.itemHeight + this.verticalMargin;
  }

  /** 根据被过滤后剩下的元素数量，列数，行高，计算grid容器的总高度 */
  getTotalHeight(filteredTotal) {
    return (
      Math.ceil(filteredTotal / this.columns) * this.rowHeight -
      this.verticalMargin
    );
  }

  getRow(index) {
    return Math.floor(index / this.columns);
  }

  getColumn(index) {
    return index - this.getRow(index) * this.columns;
  }

  /** 计算第index个单元格相对于grid容器的x,y坐标 */
  getPosition(index) {
    // 第N列
    const col = this.getColumn(index);
    // 第N行
    const row = this.getRow(index);
    const margin = this.horizontalMargin;
    const width = this.itemWidth;

    return {
      x: Math.round(col * width + col * margin),
      y: Math.round((this.itemHeight + this.verticalMargin) * row),
    };
  }

  getTransform(index) {
    const position = this.getPosition(index);
    return 'translate3d(' + position.x + 'px, ' + position.y + 'px, 0)';
  }

  /** 计算单元格样式，使用了绝对定位 */
  getStyle(index, animation, isFiltered) {
    const transform = this.getTransform(index);
    const style = {
      width: this.itemWidth + 'px',
      height: this.itemHeight + 'px',
      WebkitTransform: transform,
      MozTransform: transform,
      msTransform: transform,
      transform: transform,
      position: 'absolute',
      boxSizing: 'border-box',
      display: isFiltered ? 'none' : 'block',
    };

    if (animation) {
      style.WebkitTransition = '-webkit-' + animation;
      style.MozTransition = '-moz-' + animation;
      style.msTransition = 'ms-' + animation;
      style.transition = animation;
    }

    return style;
  }
}
