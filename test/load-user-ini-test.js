const test = require('ava')
const loadUserIni = require('../src/load-user-ini')

test('has ini sections', t => {
  const ini = loadUserIni()
  t.true(ini.hasSection('demo'), 'has demo section')
  t.true(ini.hasSection('as-a'), 'has as-a section')
  t.false(ini.hasSection('does not exist'), 'does not have unknown section')
})

test('has section under an alias', t => {
  const ini = loadUserIni()
  t.true(ini.hasSection('name-one'), 'has section name-one')
  t.true(ini.hasSection('name-two'), 'has section name-two')
  t.true(ini.hasSection('name-three'), 'has section name-three')
  t.false(ini.hasSection('name-one, name-two, name-three'), 'initial section was removed')
})

test('ignores empty aliases', t => {
  const ini = loadUserIni()
  t.true(ini.hasSection('alias1'), 'has section alias1')
  t.true(ini.hasSection('alias2'), 'has section alias2')
})
