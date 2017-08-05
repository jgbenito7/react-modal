import React from 'react'
import PropTypes from 'prop-types'

export default class Veil extends React.PureComponent {
  constructor (props) {
    super(props)

    this.ref = node => (this.node = node)

    this.handleClick = event => {
      event.preventDefault()

      if (event.target === this.node) {
        this.props.close()
      }
    }
  }

  render () {
    const { children } = this.props
    const { handleClick, ref } = this

    const props = {
      className: 'modal__veil',
      tabIndex: 0,
      role: 'button',
      onClick: handleClick,
      ref
    }

    return React.createElement('div', props, children)
  }
}

Veil.propTypes = {
  className: PropTypes.string,
  close: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
}
