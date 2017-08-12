import assert from 'assert'
import util from 'util'
import React from 'react'
import testRenderer from 'react-test-renderer'
import Veil from '../../src/Veil'

suite('output', function () {
  setup(function () {
    const props = { close: () => {} }

    this.tree = testRenderer.create(React.createElement(Veil, props)).toJSON()
  })

  test('renders a wrapper div', function () {
    assert.equal(this.tree.type, 'div')
  })

  test('has a modal__veil class', function () {
    const className = 'modal__veil'
    const classNames = this.tree.props.className.split(' ')

    assert(
      classNames.includes(className),
      `expected classnames ${util.inspect(
        classNames
      )} to contain '${className}'`
    )
  })

  test('has a tabIndex of 0', function () {
    assert.equal(this.tree.props.tabIndex, 0)
  })
})
