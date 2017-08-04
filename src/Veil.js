import React from 'react'
import PropTypes from 'prop-types'

const Veil = ({ close }) => React.createElement('div', {
  className: 'modal__veil',
  onClick: close,
  tabIndex: 0,
  role: 'button'
})

Veil.propTypes = {
  className: PropTypes.string,
  close: PropTypes.func.isRequired
}

export default Veil
