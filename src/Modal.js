import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Provider from './Provider'

// const modalControls = [
//   close => <Close onClick={close} />,
//   () => <Triangle onClick={somethingElse} />
// ]

// <Modal.Provider>
//   ...
//     <Modal className="my-cool-modal" withControls={modalControls}>
//       <h1>The content of my Modal</h1>
//     </Modal>
//   ...
// </Modal.Provider>

const Modal = ({ withControls, ...props }, { modal }) => {
  const className = classnames(props.className, 'modal')

  modal.open()

  return React.createElement('div', { className }, props.children)
}

Modal.displayName = 'Modal'
Modal.Provider = Provider

Modal.propTypes = {
  withControls: PropTypes.arrayOf(PropTypes.func),
  className: PropTypes.string
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
