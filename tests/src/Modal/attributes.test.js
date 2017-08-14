import test from 'ava'
import Modal from '../../../src/Modal'
import { component as modal } from '../../utils'

test.beforeEach(t => {
  t.context.treeForArgs = {
    Component: Modal,
    defaultProps: {
      className: 'my-cool-modal'
    }
  }
})

test(modal.isA, {}, 'div')
test(modal.hasClass, {}, 'my-cool-modal')
test(modal.hasClass, {}, 'modal__content')
