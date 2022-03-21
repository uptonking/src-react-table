import React from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';

function getScale(value) {
  return `scale(${value}, ${value ** 2})`;
}

const styles = {
  default: { opacity: 0, transform: getScale(0.75) },
  entering: { opacity: 1, transform: getScale(1) },
  entered: { opacity: 1, transform: `${getScale(1)} translateZ(0)` },
  exiting: { opacity: 0, transform: getScale(0.75) },
  exited: { opacity: 0, transform: getScale(0.75) },
};

const getTransitionTransformOrigin = (placement) => {
  switch (placement) {
    case 'top-start':
      return 'left bottom';
    case 'top':
      return 'center bottom';
    case 'top-end':
      return 'right bottom';
    case 'right-start':
      return 'left top';
    case 'right':
      return 'left center';
    case 'right-end':
      return 'left bottom';
    case 'bottom-start':
      return 'left top';
    case 'bottom':
      return 'center top';
    case 'bottom-end':
      return 'right top';
    case 'left-start':
      return 'right top';
    case 'left':
      return 'right center';
    case 'left-end':
      return 'right bottom';
    default:
      return 'center center';
  }
};

class Grow extends React.Component {
  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  handleEnter = (node) => {
    if (this.props.onEnter) this.props.onEnter(node);
  };

  handleExit = (node) => {
    if (this.props.onExit) this.props.onExit(node);
  };

  render() {
    const {
      children,
      style: styleProp,
      timeout,
      placement,
      ...other
    } = this.props;
    const style = {
      ...styleProp,
      ...styles.default,
      transition: `opacity ${timeout}ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform ${
        timeout * 0.8
      }ms cubic-bezier(0.4, 0, 0.2, 1) 0ms`,
      ...(placement
        ? { transformOrigin: getTransitionTransformOrigin(placement) }
        : {}),
      ...(React.isValidElement(children) ? children.props.style : {}),
    };

    return (
      <Transition
        appear
        onEnter={this.handleEnter}
        onExit={this.handleExit}
        timeout={timeout === 'auto' ? null : timeout}
        {...other}
      >
        {(state, childProps) => {
          return React.cloneElement(children, {
            style: { ...style, ...styles[state] },
            ...childProps,
          });
        }}
      </Transition>
    );
  }
}

Grow.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  in: PropTypes.bool,
  onEnter: PropTypes.func,
  onExit: PropTypes.func,
  style: PropTypes.object,
  theme: PropTypes.object,
  timeout: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({ enter: PropTypes.number, exit: PropTypes.number }),
  ]),
};

Grow.defaultProps = { timeout: 250 };

export default Grow;
