import React, { Component } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';

const focusableElementsList = [
  'a[href]',
  'button:not([disabled])',
  'area[href]',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'iframe',
  'object',
  'embed',
  '*[tabindex]',
  '*[contenteditable]',
];

const focusableElementsSelector = focusableElementsList.join();

class TabBumper extends Component {
  componentDidMount() {
    return this.registerTabBumper();
  }

  componentDidUpdate() {
    return this.registerTabBumper();
  }

  getParentRef = (node) => {
    this.parentNode = node;
  }

  filterFocusableElements = element => (
    element.getAttribute('tabindex') !== '-1'
  )

  isTabKeyEvent = (event) => {
    const tabCharCode = 9;

    return event.keyCode === tabCharCode;
  }

  handleFirstElement = (event) => {
    if (event.shiftKey && this.isTabKeyEvent(event)) {
      event.preventDefault();
      this.lastElement.focus();
    }
  }

  handleLastElement = (event) => {
    if (!event.shiftKey && this.isTabKeyEvent(event)) {
      event.preventDefault();

      this.firstElement.focus();
    }
  }

  removeListeners = () => {
    const firstElement = this.firstElement;
    const lastElement = this.lastElement;

    if (firstElement !== null) {
      firstElement.removeEventListener('keydown', this.handleFirstElement);
    }

    if (lastElement !== null) {
      lastElement.removeEventListener('keydown', this.handleLastElement);
    }
  }

  registerTabBumper = () => {
    const elements =
      Array.from(this.parentNode.querySelectorAll(focusableElementsSelector));

    const focusableElements = elements.filter(this.filterFocusableElements);

    if (R.isEmpty(focusableElements)) {
      return;
    }

    this.firstElement = focusableElements[0];
    this.lastElement = focusableElements[focusableElements.length - 1];
    this.firstElement.addEventListener('keydown', this.handleFirstElement);
    this.lastElement.addEventListener('keydown', this.handleLastElement);
  }

  render() {
    const { children } = this.props;

    return <div {...this.props} ref={this.getParentRef}>{children}</div>;
  }
}

TabBumper.displayName = 'TabBumper';

TabBumper.propTypes = {
  children: PropTypes.node,
};

export default TabBumper;
