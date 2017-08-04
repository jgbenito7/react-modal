import React from 'react'
import PropTypes from 'prop-types'
import Veil from './Veil'

export default class Provider extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: this.props.isOpen,
      scrollY: 0
    }

    this.open = () => this.setState({ isOpen: true })
    this.close = () => this.setState({ isOpen: false })
  }

  get modal() {
    return {
      open: this.open,
      close: this.close
    }
  }

  shouldComponentUpdate(nextProps) {
    return this.props !== nextProps;
  }

  componentDidUpdate() {
    const body = document.body;
    const { scrollY } = window;

    if (this.props.isOpen) {
      body.classList.add('modal__body-freeze');
      body.style.top = `-${scrollY}px`;
      this.setState({ scrollY });
    } else {
      body.classList.remove('modal__body-freeze');
      body.style.top = null;
      window.scrollTo(0, this.state.scrollY);
    }
  }

  getChildContext() {
    return {
      modal: this.modal
    }
  }

  render() {
    const { isOpen } = this.state
    const { children, closeOnVeilClick } = this.props
    const close = closeOnVeilClick ? this.close : () => {}

    if (!isOpen) {
      return children
    }

    return React.createElement('div', null, [
      React.createElement(Veil, { key: 'veil', close }),
      React.cloneElement(children, { key: 'children' })
    ])
  }
}

Provider.childContextTypes = {
  modal: React.PropTypes.shape({
    open: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired
  })
}

Provider.defaultProps = {
  isOpen: false,
  closeOnVeilClick: true
}
