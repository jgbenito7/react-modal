import React from 'react'
import PropTypes from 'prop-types'
import Veil from './Veil'
import Modal from './Modal'

export default class Provider extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      isOpen: this.props.isOpen,
      content: this.props.content,
      props: this.props.props
    }

    this.open = (content, props) =>
      this.setState({ isOpen: true, content, props })

    this.close = () =>
      this.setState({
        isOpen: false,
        content: this.props.content,
        props: this.props.props
      })
  }

  get modal () {
    return {
      open: this.open,
      close: this.close
    }
  }

  getChildContext () {
    return {
      modal: this.modal
    }
  }

  render () {
    const { isOpen, content, props: modalProps } = this.state
    const { children, closeOnVeilClick } = this.props
    const close = closeOnVeilClick ? this.close : () => {}

    if (!isOpen) {
      return children
    }

    return React.createElement('div', null, [
      React.createElement(
        Veil,
        { key: 'veil', close },
        React.createElement(Modal, modalProps, content(close))
      ),
      React.cloneElement(children, { key: 'children' })
    ])
  }
}

Provider.childContextTypes = {
  modal: PropTypes.shape({
    open: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired
  })
}

Provider.defaultProps = {
  isOpen: false,
  closeOnVeilClick: true,
  content: () => null,
  props: null
}

Provider.propTypes = {
  content: PropTypes.func.isRequired,
  props: PropTypes.object
}
