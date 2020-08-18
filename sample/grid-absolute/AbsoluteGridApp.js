import React, { useState, useCallback, useMemo } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import * as _ from 'lodash';
import createAbsoluteGrid from '../../vendor/react-absolute-grid/AbsoluteGrid';
import SampleDisplay from './SampleDisplay';
import * as data from './sampleData';

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
 * todo1: drag元素交换位置动画不流畅
 * todo2: requestAnimationFrame' handler took 58ms
 */
export default function AbsoluteGridApp() {
  const [sampleItems, setSampleItems] = useState(data.screens);
  // const [zoom, setZoom] = useState(0.7);

  // console.log('==AbsoluteGridApp', sampleItems);

  // Change the item's sort order
  const onMove = useCallback(
    function (source, target) {
      source = _.find(sampleItems, { key: parseInt(source, 10) });
      target = _.find(sampleItems, { key: parseInt(target, 10) });

      const targetSort = target.sort;

      // CAREFUL, For maximum performance we must maintain the array's order, but change sort
      setSampleItems(s =>
        s.map(function (item) {
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
        }),
      );
    },
    [sampleItems],
  );

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
 * //TODO: implement inside a react component rather than doing this all manually
 **/

function demo() {
  let sampleItems = data.screens;
  let zoom = 0.7;
  let render;

  // We set a property on each item to let the grid know not to show it
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

  // Change the item's sort order
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
