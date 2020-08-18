import React, { Component, PureComponent } from 'react';
import { debounce, sortBy } from 'lodash';
import createDisplayObject from './BaseDisplayObject';
import DragManager from './DragManager';
import LayoutManager from './LayoutManager';
import { getCircularReplacer } from '../../test-utils/logUtils';
/**
 * 一个高阶组件，会将输入组件作为单元格要渲染的内容，返回一个grid。
 * 单元格需设置宽高，单元格位置由translate3d(xpx,ypx,0px)确定。
 * 基于position absolute实现的表格组件，ui结构层次
 * - div-tbody-position-relative
 *  - div-cell-position-absolute
 *    - CustomComponent
 *
 * @param {*} DisplayObject 单元格内部要渲染的组件
 * @param {*} displayProps 传递给DisplayObject的props
 * @param {*} forceImpure 默认false，默认使用PureComponent
 */
export default function createAbsoluteGrid(
  DisplayObject,
  displayProps = {},
  forceImpure = false,
) {
  const Comp = forceImpure ? Component : PureComponent;
  /** 创建单元格组件 */
  const WrappedDisplayObject = createDisplayObject(
    DisplayObject,
    displayProps,
    forceImpure,
  );

  return class extends Comp {
    static defaultProps = {
      items: [],
      keyProp: 'key',
      filterProp: 'filtered',
      sortProp: 'sort',
      itemWidth: 128,
      itemHeight: 128,
      verticalMargin: -1,
      responsive: false,
      dragEnabled: false,
      animation: 'transform 300ms ease',
      zoom: 1,
      onMove: () => {},
      onDragStart: () => {},
      onDragMove: () => {},
      onDragEnd: () => {},
    };

    constructor(props) {
      super(props);
      this.onResize = debounce(this.onResize, 150);
      this.dragManager = new DragManager(
        this.props.onMove,
        this.props.onDragStart,
        this.props.onDragEnd,
        this.props.onDragMove,
        this.props.keyProp,
      );
      this.state = {
        layoutWidth: 0,
      };
    }

    render() {
      // console.log('==props4AbsoluteGrid', this.state);
      // 第一次mount时，layoutWidth为0，会执行showGrid，后面layoutWidth为具体数值后，就不执行if分支了
      const showGrid = !this.state.layoutWidth || !this.props.items.length;
      // console.log('showGrid, ', showGrid);
      if (showGrid) {
        return <div ref={node => (this.container = node)} id='showGrid' />;
      }

      let filteredIndex = 0;
      const sortedIndex = {};

      /*
       If we actually sorted the array, React would re-render the DOM nodes
       Creating a sort index just tells us where each item should be
       This also clears out filtered items from the sort order and
       eliminates gaps and duplicate sorts
       */
      sortBy(this.props.items, this.props.sortProp).forEach(item => {
        if (!item[this.props.filterProp]) {
          const key = item[this.props.keyProp];
          sortedIndex[key] = filteredIndex;
          filteredIndex++;
        }
      });

      const itemsLength = this.props.items.length;
      // 为输入数组的每个元素创建一个单元格组件
      const gridItems = this.props.items.map(item => {
        const key = item[this.props.keyProp];
        const index = sortedIndex[key];
        return (
          <WrappedDisplayObject
            item={item}
            index={index}
            key={key}
            itemsLength={itemsLength}
            animation={this.props.animation}
            itemWidth={this.props.itemWidth}
            itemHeight={this.props.itemHeight}
            layoutWidth={this.state.layoutWidth}
            verticalMargin={this.props.verticalMargin}
            zoom={this.props.zoom}
            keyProp={this.props.keyProp}
            filterProp={this.props.filterProp}
            dragEnabled={this.props.dragEnabled}
            dragManager={this.dragManager}
          />
        );
      });

      const options = {
        itemWidth: this.props.itemWidth,
        itemHeight: this.props.itemHeight,
        verticalMargin: this.props.verticalMargin,
        zoom: this.props.zoom,
      };
      const layout = new LayoutManager(options, this.state.layoutWidth);

      // grid容器是relative定位，是所有单元格组件的定位上下文
      const gridStyle = {
        position: 'relative',
        display: 'block',
        height: layout.getTotalHeight(filteredIndex),
      };

      // grid的容器，相当于tbody，但直接子元素就是cell
      return (
        <div
          style={gridStyle}
          className='absoluteGrid'
          ref={node => (this.container = node)}
        >
          {gridItems}
        </div>
      );
    }

    componentDidMount() {
      // If responsive, listen for resize
      if (this.props.responsive) {
        window.addEventListener('resize', this.onResize);
      }
      this.onResize();
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.onResize);
    }

    onResize = () => {
      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(this.getDOMWidth);
      } else {
        setTimeout(this.getDOMWidth, 66);
      }
    };

    /** 获取grid容器的宽度，用来实现responsive */
    getDOMWidth = () => {
      // console.log(
      //   'this.container, ',
      //   JSON.stringify(this.container, getCircularReplacer),
      // );
      // console.log('this.container, ', this.container);
      // console.log('containerWidth, ', this.container.clientWidth);
      const width = this.container && this.container.clientWidth;
      // console.log('getDOMWidth, ', width);

      if (this.state.layoutWidth !== width) {
        this.setState({ layoutWidth: width });
      }
    };
  };
}
