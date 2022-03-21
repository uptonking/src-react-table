import React from 'react';
import PropTypes from 'prop-types';

export default class Static extends React.Component {
  static propTypes = {
    shouldUpdate: PropTypes.bool,
  };

  shouldComponentUpdate(nextProps) {
    return Boolean(nextProps.shouldUpdate);
  }

  render() {
    return this.props.children;
  }
}
