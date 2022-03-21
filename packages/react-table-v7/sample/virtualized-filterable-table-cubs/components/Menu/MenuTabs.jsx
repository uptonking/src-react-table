import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import Icon from '../Icon';
import MenuTab from './MenuTab';

const ActiveIndicator = styled.div`
  position: absolute;
  height: 2px;
  ${({ width }) => (width || width === 0 ? `width: ${width}px;` : ``)}
  bottom: 0;
  ${({ left }) => (left || left === 0 ? `left: ${left}px;` : ``)}
  background-color: ${({ theme }) => theme.color.info40};
  transition: 150ms cubic-bezier(0.4, 0, 0.2, 1);
`;
const TabHeadersWrap = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.color.border};
  position: relative;
  margin: -4px -4px 4px -4px;
`;
const TabHeaders = styled.div`
  display: flex;
`;
const TabHeader = styled.div`
  flex: 1;
  font-size: 0.75rem;
  padding: 4px 8px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  box-sizing: border-box;
  cursor: pointer;
  transition: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  ${({ selected, theme }) => (selected ? `color: ${theme.color.primary};` : ``)}
`;

const MenuTabs = ({ children, selectedValue, onClickTabHeader }) => {
  const [activeTabEl, setActiveTabEl] = useState();
  const tabChildren = getTabChildren(children);
  const childrenWithProps = React.Children.map(children, (child) =>
    React.isValidElement(child) ? React.cloneElement(child) : child,
  ).filter((child) => child.props.value === selectedValue);

  const tabRefs = useRef([]);

  useEffect(() => {
    setTimeout(() => setActiveTabEl(tabRefs.current?.[selectedValue]));
  }, [selectedValue, tabRefs]);

  return (
    <>
      {(tabChildren.length > 1 || selectedValue == null) && (
        <TabHeadersWrap>
          <ActiveIndicator
            width={activeTabEl?.offsetWidth}
            left={activeTabEl?.offsetLeft}
          />
          <TabHeaders>
            {tabChildren.map((child) => {
              const isSelected = child.props.value === selectedValue;

              return (
                <TabHeader
                  key={child.props.value}
                  selected={isSelected}
                  onClick={
                    isSelected
                      ? undefined
                      : () => onClickTabHeader?.(child.props.value)
                  }
                  ref={(ref) => (tabRefs.current[child.props.value] = ref)}
                >
                  {child.props.icon && (
                    <Icon type={child.props.icon} size='xs' />
                  )}
                  {typeof child.props.label === 'function'
                    ? child.props.label()
                    : child.props.label}
                </TabHeader>
              );
            })}
          </TabHeaders>
        </TabHeadersWrap>
      )}
      {selectedValue && childrenWithProps}
    </>
  );
};

export default MenuTabs;

export function getTabChildren(children) {
  const mapTabChildren = (child) => {
    if (
      !child ||
      child.type === MenuTab ||
      child.type.target === MenuTab ||
      child.type.cubsInnerType === MenuTab
    ) {
      return child;
    }

    if (child.type === React.Fragment) {
      return React.Children.toArray(child.props.children).map(mapTabChildren);
    }

    return null;
  };

  return React.Children.toArray(children)?.flatMap(mapTabChildren);
}
