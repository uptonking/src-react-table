import React, { Component, PureComponent } from 'react';
import LayoutManager from './LayoutManager.js';
/**
 * 一个高阶组件，会对输入的组件外层包裹一层div作为单元格组件。
 * 主要添加单元格的absolute定位样式，transform3d控制的位置，还添加拖拽处理事件。
 */
export default function createDisplayObject(
  DisplayObject,
  displayProps,
  forceImpure,
) {
  const Comp = forceImpure ? Component : PureComponent;

  return class extends Comp {
    state = {};

    /** 更新拖拽距离x,y的方法 */
    updateDrag(x, y) {
      // Pause Animation lets our item return to a snapped position without being animated
      let pauseAnimation = false;
      if (!this.props.dragManager.dragItem) {
        pauseAnimation = true;
        setTimeout(() => {
          this.setState({ pauseAnimation: false });
        }, 20);
      }
      this.setState({
        dragX: x,
        dragY: y,
        pauseAnimation: pauseAnimation,
      });
    }

    onDrag = e => {
      if (this.props.dragManager) {
        this.props.dragManager.startDrag(
          e,
          this.domNode,
          this.props.item,
          this.updateDrag.bind(this),
        );
      }
    };

    /** 计算单元格的样式的入口，主要添加position absolute,以及translate3d */
    getStyle() {
      const options = {
        itemWidth: this.props.itemWidth,
        itemHeight: this.props.itemHeight,
        verticalMargin: this.props.verticalMargin,
        zoom: this.props.zoom,
      };
      const layout = new LayoutManager(options, this.props.layoutWidth);
      // 单元格非拖拽时的样式
      const style = layout.getStyle(
        this.props.index,
        this.props.animation,
        this.props.item[this.props.filterProp],
      );

      // If this is the object being dragged, return a different style
      if (
        this.props.dragManager.dragItem &&
        this.props.dragManager.dragItem[this.props.keyProp] ===
          this.props.item[this.props.keyProp]
      ) {
        // 计算拖拽时的样式
        const dragStyle = this.props.dragManager.getStyle(
          this.state.dragX,
          this.state.dragY,
        );
        return { ...style, ...dragStyle };
      } else if (this.state && this.state.pauseAnimation) {
        const pauseAnimationStyle = { ...style };
        pauseAnimationStyle.WebkitTransition = 'none';
        pauseAnimationStyle.MozTransition = 'none';
        pauseAnimationStyle.msTransition = 'none';
        pauseAnimationStyle.transition = 'none';
        return pauseAnimationStyle;
      }
      return style;
    }

    componentDidMount() {
      if (this.props.dragEnabled) {
        this.domNode.addEventListener('mousedown', this.onDrag);
        this.domNode.addEventListener('touchstart', this.onDrag);

        // 给每个单元格设置data-key属性，用于拖拽时判断目标位置
        this.domNode.setAttribute(
          'data-key',
          this.props.item[this.props.keyProp],
        );
      }
    }

    componentWillUnmount() {
      if (this.props.dragEnabled) {
        this.props.dragManager.endDrag();
        this.domNode.removeEventListener('mousedown', this.onDrag);
        this.domNode.removeEventListener('touchstart', this.onDrag);
      }
    }

    render() {
      // console.log('==props4BaseDisplayObject', this.state);

      return (
        <div
          ref={node => (this.domNode = node)}
          style={this.getStyle()}
          className='IDCell'
        >
          <DisplayObject
            {...displayProps}
            item={this.props.item}
            index={this.props.index}
            itemsLength={this.props.itemsLength}
          />
        </div>
      );
    }
  };
}
