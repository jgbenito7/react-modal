import test from 'ava'
import React from 'react'
import { shallow } from 'enzyme'
import withModal from '../../src/withModal'

const Target = () => null

test('assigns context.modal to props.modal', t => {
  const modal = {}
  const component = React.createElement(withModal(Target))
  const wrapper = shallow(component, { context: { modal } })

  t.is(wrapper.prop('modal'), modal)
})
