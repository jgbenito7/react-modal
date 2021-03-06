import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const focusableElementsSelector = [
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
  '*[contenteditable]'
].join()

export default class Modal extends React.PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      scrollY: 0
    }

    this.ref = node => (this.node = node)
  }

  componentDidUpdate () {
    this.registerTabBumper()
  }

  componentDidMount () {
    const win = this.props.win || typeof window === 'undefined' ? null : window

    if (!win) {
      return
    }

    this.registerTabBumper()

    const { scrollY } = win
    const { body } = win.document

    body.classList.add('modal__body-freeze')
    body.style.top = `-${scrollY}px`

    this.setState({ scrollY })
  }

  componentWillUnmount () {
    const win = this.props.win || typeof window === 'undefined' ? null : window

    if (!win) {
      return
    }

    this.removeListeners()

    const { body } = win.document

    body.classList.remove('modal__body-freeze')
    body.style.top = null

    win.scrollTo(0, this.state.scrollY)
  }

  removeListeners () {
    const firstElement = this.firstElement
    const lastElement = this.lastElement

    if (firstElement != null || firstElement !== undefined) {
      firstElement.removeEventListener(
        'keydown',
        this.handleFirstElement.bind(this)
      )
    }

    if (lastElement != null || lastElement !== undefined) {
      lastElement.removeEventListener(
        'keydown',
        this.handleLastElement.bind(this)
      )
    }
  }

  isTabKeyEvent (event) {
    const tabCharCode = 9

    return event.keyCode === tabCharCode
  }

  handleFirstElement (event) {
    if (event.shiftKey && this.isTabKeyEvent(event)) {
      event.preventDefault()

      this.lastElement.focus()
    }
  }

  handleLastElement (event) {
    if (!event.shiftKey && this.isTabKeyEvent(event)) {
      event.preventDefault()

      this.firstElement.focus()
    }
  }

  filterFocusableElements (element) {
    return element.getAttribute('tabindex') !== '-1'
  }

  registerTabBumper () {
    const elements = Array.from(
      this.node.querySelectorAll(focusableElementsSelector)
    )

    const focusableElements = elements.filter(this.filterFocusableElements)

    if (focusableElements.length === 0) {
      return
    }

    this.firstElement = focusableElements[0]
    this.lastElement = focusableElements[focusableElements.length - 1]

    this.firstElement.addEventListener(
      'keydown',
      this.handleFirstElement.bind(this)
    )

    this.lastElement.addEventListener(
      'keydown',
      this.handleLastElement.bind(this)
    )
  }

  render () {
    const { children } = this.props
    const { ref } = this
    const className = classnames(this.props.className, 'modal__content')

    return React.createElement('div', { className, ref }, children)
  }
}

Modal.displayName = 'Modal'

Modal.propTypes = {
  className: PropTypes.string,
  win: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
}
