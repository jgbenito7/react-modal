import test from 'ava'
import Veil from '../../../src/Veil'
import { component as veil } from '../../utils'

test.beforeEach(t => {
  t.context.treeForArgs = {
    Component: Veil,
    defaultProps: {
      close: () => {}
    }
  }
})

test(veil.isA, {}, 'div')
test(veil.propEq, {}, 'tabIndex', 0)
test(veil.propEq, {}, 'role', 'button')
test(veil.hasClass, {}, 'modal__veil')
