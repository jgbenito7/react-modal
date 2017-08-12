import assert from 'assert'
import * as namespace from '../../src'
import withModal from '../../src/withModal'
import Provider from '../../src/Provider'

test('exports withModal', () => {
  assert(namespace.withModal === withModal)
})

test('exports Provider', () => {
  assert(namespace.Provider === Provider)
})
