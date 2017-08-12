import { inspect } from 'util'
import React from 'react'
import testRenderer from 'react-test-renderer'

const treeFor = ({ Component, defaultProps }) => ({ props, children }) =>
  testRenderer
    .create(
      React.createElement(
        Component,
        Object.assign({}, defaultProps, props),
        children || null
      )
    )
    .toJSON()

const component = {}

component.propEq = (t, setup, prop, expected) => {
  const tree = treeFor(t.context.treeForArgs)(setup || {})

  t.is(tree.props[prop], expected)
}

component.propEq.title = (providedTitle, _, input, expected) =>
  `${providedTitle} component.props.${input} === ${expected}`.trim()

component.isA = (t, setup, expected) => {
  const tree = treeFor(t.context.treeForArgs)(setup || {})

  t.is(tree.type, expected)
}

component.isA.title = (providedTitle, _, expected) =>
  `${providedTitle} component.type === ${expected}`.trim()

component.hasClass = (t, setup, expected) => {
  const tree = treeFor(t.context.treeForArgs)(setup || {})
  const classNames = tree.props.className.split(' ')

  t.true(
    classNames.includes(expected),
    `expected classnames ${inspect(classNames)} to contain '${expected}'`
  )
}

component.hasClass.title = (providedTitle, _, expected) =>
  `${providedTitle} component.props.className ∋ ${expected}`.trim()

export { component }
