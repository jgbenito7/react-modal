import test from 'ava'
import * as namespace from '../../src'
import withModal from '../../src/withModal'
import Provider from '../../src/Provider'

test('exports withModal', t => {
  t.is(namespace.withModal, withModal)
})

test('exports Provider', t => {
  t.is(namespace.Provider, Provider)
})
