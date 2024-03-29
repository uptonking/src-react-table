import * as _ from 'lodash';
import React, { useCallback, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import { createAbsoluteGrid } from '@examples-hub/react-absolute-grid';

import SampleDisplay from './SampleDisplay';
// import data from './sampleData4simple';
import data from './sampleData';

const AbsoluteGridContainer = createAbsoluteGrid(SampleDisplay);

const Styles = styled.div`
  .gridItem {
    text-align: center;
    box-shadow: 0 0 1.25em 0 rgba(0, 0, 0, 0.2);
    background-color: beige;
    background-size: 100%;
    cursor: move;
  }

  .gridItem .name {
    position: absolute;
    bottom: -22px;
    display: block;
    width: 100%;
    color: #555;
    text-transform: capitalize;
  }
`;
/**
 * 基于react-absolute-grid的demo实现的例子。
 * 主要功能：展示基于绝对定位实现的grid，拖拽移动单元格。
 * // drag元素交换位置动画不流畅，重构onMove方法读取最新state
 * to-later: requestAnimationFrame handler took 201ms
 * to-later: 参考demo()方法实现filter和zoom
 */
export default function AbsoluteGridApp() {
  // 数据的字段包括url,name,sort,key, 测试数据的sort和key都是index数字，从1开始
  const [sampleItems, setSampleItems] = useState(data.screens);
  // const [zoom, setZoom] = useState(0.7);

  // console.log('==renderAbsoluteGridApp, ');

  /**
   * Change the item's sort order
   * 拖动单元格时会更新数据，移动时的计算思路主要是交换相邻单元格的数据。
   * 以{key:2,sort:2}换到{key:4,sort:4}为例，
   * 会多次调用此方法，依次传入([2,2],[2,3]),([2,3],[4,4]),([2,5],[5,4]),这里最后一次是回退
   * @param {*} source  起点数据的key
   * @param {*} target 终点数据的key
   */
  const onMove = useCallback(function (source, target) {
    setSampleItems((sampleItems) => {
      // console.log('==onMove-sampleItems, ', sampleItems);
      source = _.find(sampleItems, { key: parseInt(source, 10) });
      target = _.find(sampleItems, { key: parseInt(target, 10) });
      // console.log('==onMove-source-target, ', source, target);

      const targetSort = target.sort;

      // CAREFUL, For maximum performance we must maintain the array's order, but change sort
      const newItems = sampleItems.map(function (item) {
        // Decrement sorts between positions when target is greater

        // /对要移动的起点元素，修改其sort大小
        if (item.key === source.key) {
          // console.log('item.key === source.key');

          return {
            ...item,
            sort: targetSort,
          };
        } else if (
          target.sort > source.sort &&
          item.sort <= target.sort &&
          item.sort > source.sort
        ) {
          // /若终点在起点之后，且当前元素在起点后终点前，则当前元素前移一位
          // console.log(' source.sort < item.sort <= target.sort');

          return {
            ...item,
            sort: item.sort - 1,
          };
          // Increment sorts between positions when source is greater
        } else if (item.sort < source.sort && item.sort >= target.sort) {
          // /若当前项目在起点前且在终点后，则当前元素后移一位
          // 这里是往前拖动的场景，如传入([2,5],[5,4])，则当前item的sort为4时，变为5
          // console.log('item.sort < source.sort && >= target.sort');
          // console.log('item-key-sort', item.key, item.sort);

          return {
            ...item,
            sort: item.sort + 1,
          };
        }

        // 对其余元素，不做修改
        return item;
      });
      // console.log('newItems, ', newItems);
      return newItems;
    });
    // setSampleItems(newItems);
  }, []);

  const onMoveDebounced = useMemo(() => _.debounce(onMove, 40), [onMove]);

  return (
    // <Styles>
    //   <div id='root4absoluteApp' style={{ maxWidth: 960 }}>
    //     <div style={{ width: '100%' }}>
    <AbsoluteGridContainer
      items={sampleItems}
      onMove={onMoveDebounced}
      dragEnabled={true}
      // zoom={zoom}
      responsive={true}
      verticalMargin={42}
      itemWidth={144}
      itemHeight={256}
    />
    //   </div>
    //   </div>
    // </Styles>
  );
}

// demo();

/**
 * This demo is meant to show you all of the things that are possible with ReactAbsoluteGrid.
 * If implemented in a Flux project, the grid would be in a render method with the
 * event handlers calling Actions which would update a Store.
 * For the sake of brevity, the "store" is implemented locally and the changes re-rendered manually
 *
 * //to-done: implement inside a react component rather than doing this all manually
 **/

function demo() {
  let sampleItems = data.screens;
  let zoom = 0.7;
  let render;

  // We set a property on each item to let the grid know not to show it
  // 过滤元素通过添加新的filtered属性来标记
  const onFilter = function (event) {
    const search = new RegExp(event.target.value, 'i');
    sampleItems = sampleItems.map(function (item) {
      const isMatched = !item.name.match(search);
      if (!item.filtered || isMatched !== item.filtered) {
        return {
          ...item,
          filtered: isMatched,
        };
      }
      return item;
    });
    render();
  };

  // Change the item's sort
  const onMove = function (source, target) {
    source = _.find(sampleItems, { key: parseInt(source, 10) });
    target = _.find(sampleItems, { key: parseInt(target, 10) });

    const targetSort = target.sort;

    // CAREFUL, For maximum performance we must maintain the array's order, but change sort
    sampleItems = sampleItems.map(function (item) {
      // Decrement sorts between positions when target is greater
      if (item.key === source.key) {
        return {
          ...item,
          sort: targetSort,
        };
      } else if (
        target.sort > source.sort &&
        item.sort <= target.sort &&
        item.sort > source.sort
      ) {
        return {
          ...item,
          sort: item.sort - 1,
        };
        // Increment sorts between positions when source is greater
      } else if (item.sort >= target.sort && item.sort < source.sort) {
        return {
          ...item,
          sort: item.sort + 1,
        };
      }
      return item;
    });
    // Perf.start();
    render();
    // Perf.stop();
    // Perf.printWasted();
  };

  const onMoveDebounced = _.debounce(onMove, 40);

  // const unMountTest = function () {
  //   if (ReactDOM.unmountComponentAtNode(document.getElementById('Demo'))) {
  //     ReactDOM.render(
  //       <button onClick={unMountTest}>Remount</button>,
  //       document.getElementById('UnmountButton'),
  //     );
  //   } else {
  //     render();
  //     ReactDOM.render(
  //       <button onClick={unMountTest}>Test Unmount</button>,
  //       document.getElementById('UnmountButton'),
  //     );
  //   }
  // };

  const AbsoluteGrid = createAbsoluteGrid(SampleDisplay);

  render = function () {
    ReactDOM.render(
      <AbsoluteGrid
        items={sampleItems}
        onMove={onMoveDebounced}
        dragEnabled={true}
        zoom={zoom}
        responsive={true}
        verticalMargin={42}
        itemWidth={230}
        itemHeight={409}
      />,
      document.getElementById('Demo'),
    );
  };

  const renderDebounced = _.debounce(render, 150);

  // Update the zoom value
  const onZoom = function (event) {
    zoom = parseFloat(event.target.value);
    renderDebounced();
  };

  ReactDOM.render(
    <input
      onChange={onZoom}
      type='range'
      min='0.3'
      max='1.5'
      step='0.1'
      defaultValue={zoom}
    />,
    document.getElementById('Zoom'),
  );
  ReactDOM.render(
    <input placeholder='Filter eg: calendar' onChange={onFilter} type='text' />,
    document.getElementById('Filter'),
  );
  // ReactDOM.render(
  //   <button onClick={unMountTest}>Test Unmount</button>,
  //   document.getElementById('UnmountButton'),
  // );
  render();
}
