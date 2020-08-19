import React from 'react';

/**
 * 会在grid cell中显示的组件，cell由position absolute控制位置
 */
export default function SampleDisplay(props) {
  const { item } = props;
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        // backgroundImage: `url('${this.props.item.url}')`,
        textAlign: 'center',
        boxShadow: `0 0 1.25em 0 rgba(0, 0, 0, 0.2)`,
        backgroundColor: 'beige',
        backgroundSize: '100%',
        cursor: 'move',
      }}
      className='gridItem'
    >
      <span
        style={{
          // 这里的定位上下文是absolute的cell
          position: 'absolute',
          bottom: -22,
          display: 'block',
          width: '100%',
          textTransform: 'capitalize',
        }}
        className='name'
      >
        {item.name}
        {item.key}
      </span>
    </div>
  );
}
