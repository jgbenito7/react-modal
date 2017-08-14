import test from 'ava'
import browserEnv from 'browser-env'
import Modal from '../../../src/Modal'

browserEnv()

// https://github.com/airbnb/enzyme/issues/395
const React = require('react')
const { mount } = require('enzyme')

Object.defineProperty(window, 'scrollTo', {
  value: () => {}
})

test('adds a freeze class to body on mount', t => {
  mount(React.createElement(Modal))

  const target = 'modal__body-freeze'
  const list = document.body.classList

  t.true(list.contains(target), `expected "${list}" to contain "${target}"`)
})

test('removes freeze class from body on unmount', t => {
  const wrapper = mount(React.createElement(Modal))

  wrapper.unmount()

  const target = 'modal__body-freeze'
  const list = document.body.classList

  t.false(list.contains(target), `expected "${list}" to not contain "${target}"`)
})

test('sets offset to window scroll on mount', t => {
  const scrollAmount = 500

  window.scrollY = scrollAmount

  mount(React.createElement(Modal))

  t.is(document.body.style.top, `-${scrollAmount}px`)
})

test('scrolls window to offset on unmount', t => {
  const scrollAmount = 500

  window.scrollY = scrollAmount

  const wrapper = mount(React.createElement(Modal))

  wrapper.unmount()

  t.is(document.body.style.top, '')
  t.is(window.scrollY, scrollAmount)
})

test.todo('corrals tab navigation to the modal')
