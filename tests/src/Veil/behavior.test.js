import test from 'ava'
import browserEnv from 'browser-env'
import { mount } from 'enzyme'
import sinon from 'sinon'
import React from 'react'
import Veil from '../../../src/Veil'

browserEnv()

test('calls close when clicked', t => {
  const close = sinon.spy()
  const component = React.createElement(Veil, { close })
  const wrapper = mount(component)

  wrapper.simulate('click')

  t.true(close.called)
})

test('does not call close when veil children are clicked', t => {
  const close = sinon.spy()
  const child = React.createElement('a')
  const component = React.createElement(Veil, { close }, child)
  const wrapper = mount(component)

  wrapper.find('a').simulate('click')

  t.false(close.called)
})
