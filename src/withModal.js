import React from 'react'
import PropTypes from 'prop-types'
import hoistStatics from 'hoist-non-react-statics'

const withModal = Component => {
  const C = (props, { modal }) => {
    const { wrappedComponentRef } = props

    delete props.wrappedComponentRef

    return React.createElement(
      Component,
      Object.assign({}, props, {
        ref: wrappedComponentRef,
        modal
      })
    )
  }

  C.displayName = `withModal(${Component.displayName || Component.name})`

  C.WrappedComponent = Component

  C.contextTypes = {
    modal: PropTypes.object.isRequired
  }

  C.propTypes = {
    wrappedComponentRef: PropTypes.func
  }

  return hoistStatics(C, Component)
}

export default withModal
