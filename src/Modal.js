import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Provider from './Provider'

export default class Modal extends React.PureComponent {
  render() {
    const { children } = this.props
    const className = classnames(this.props.className, 'modal')

    this.context.modal.open()

    return React.createElement('div', { className }, children)
  }
}

Modal.displayName = 'Modal'

Modal.Provider = Provider

Modal.propTypes = {
  withControls: PropTypes.arrayOf(PropTypes.func),
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
}

Modal.defaultProps = {
  withControls: []
}

Modal.contextTypes = {
  modal: PropTypes.shape({
    open: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired
  })
}
